import { Duplex } from "readable-stream";
import { getAddress, Interface } from 'ethers/lib/utils';
import { Signature, SignatureIdentifier, polyApiKey} from './constant'
import { BigNumber, providers, Contract } from "ethers";
import { ChainId, chains } from "eth-chains";
import Browser from "webextension-polyfill";
import objectHash from "object-hash";

const SYMBOL_NAME_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]
export const decodeTransactionSimulationData = (result: any, from: string) => {
  let assetChange = {
    out: "",
    outSymbol:"",
    in: "",
    inSymbol:"",
    gas: "",
  };
  for ( let changeObj of result.changes){
    console.log(changeObj)
    if(changeObj.from===from){
      assetChange.out = changeObj.amount
      assetChange.outSymbol = changeObj.symbol
    }
    if(changeObj.to===from){
      assetChange.in = changeObj.amount
      assetChange.inSymbol = changeObj.symbol
    }
  }
  assetChange.gas = result.gasUsed
  console.log('Decoded: ', assetChange)
  return assetChange
}
const getTokenSymbol = async (address: string, provider: providers.Provider) => {
  try {
    return new Contract(address, SYMBOL_NAME_ABI, provider).functions.symbol();
  } catch {
    return undefined;
  }
}

const getTokenName = async (address: string, provider: providers.Provider) => {
  try {
    return new Contract(address, SYMBOL_NAME_ABI, provider).functions.name();
  } catch {
    return undefined;
  }
}

export const sendAndAwaitResponseFromPort = (stream: Browser.Runtime.Port, data: any): Promise<any> => {
    return new Promise((resolve) => {
        const id = objectHash(data.transaction ?? data);
        stream.postMessage({id, data});
        const callback = (res: any) => {
            if(res.id === id){
                stream.onMessage.removeListener(callback);
                resolve(res.data);
            }
        };
        // Trace the message and execute callback function
        stream.onMessage.addListener(callback);
    });
}

export const sendAndAwaitResponseFromStream = (stream: Duplex, data: any): Promise<any> => {
    return new Promise((resolve) => {
      const id = objectHash(data.transaction ?? data);
      stream.write({ id, data });
  
      const callback = (response: any) => {
        if (response.id === id) {
          stream.off('data', callback);
          resolve(response.data);
        }
      };
  
      stream.on('data', callback);
    });
}

export const decodeApproval = (data: string, asset: string) => {
  if (data.startsWith(SignatureIdentifier.approve)) {
    const eth_interface = new Interface([`function ${Signature.approve}`]);
    const decoded = eth_interface.decodeFunctionData(Signature.approve, data);
    // Generate a array e.g. decode='fo', Array.from(decode) => ['f', 'o']
    const [spender, approval] = Array.from(decoded);
    if (BigNumber.from(approval).isZero()) return undefined;
    return {asset, spender};
  }
  // Decode ApproveForAll
  if (data.startsWith(SignatureIdentifier.setApprovalForAll)) {
    const eth_interface = new Interface([`function ${Signature.setApprovalForAll}`]);
    const decoded = eth_interface.decodeFunctionData(Signature.setApprovalForAll, data);
    const [spender, approved] = Array.from(decoded);
    if (!approved) return undefined;
    return {asset, spender};
  }

  return undefined;
}
//RPC is kind of conmute protocol that allows user to use the full node computing power by remote
export function getRpcUrl(chainId: number, infuraKey: string = ''): string | undefined {
  // These are not in the eth-chains package, so manually got from chainlist.org
  const overrides: any = {
    [ChainId.ArbitrumOne]: 'https://arb1.arbitrum.io/rpc',
    [ChainId.Moonbeam]: 'https://moonbeam.public.blastapi.io',
    // [ChainId.PalmMainnet]: 'https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b',
    [5]: `https://goerli.infura.io/v3/${infuraKey}`,
    // [ChainId.EthereumTestnetKovan]: `https://kovan.infura.io/v3/${infuraKey}`,
  };

  const [rpcUrl] = chains.get(chainId)?.rpc ?? [];
  return overrides[chainId] ?? rpcUrl?.replace('${INFURA_API_KEY}', infuraKey);
}

export const getTokenData = async (address: string, provider: providers.Provider) => {
  return {
    name: await getTokenName(address, provider),
    symbol: await getTokenSymbol(address, provider),
  };
}


export const DAPP_LIST_BASE_URL = 'https://revoke.cash/dapp-contract-list';
export const ETHEREUM_LISTS_CONTRACTS = 'https://raw.githubusercontent.com/ethereum-lists/contracts/main';

// Look up an address' App Name using the dapp-contract-list
export async function addressToAppName(address: string, chainId?: number): Promise<string | undefined> {
  if (!chainId) return undefined;
  const name = (await getNameFromDappList(address, chainId)) ?? (await getNameFromEthereumList(address, chainId));
  return name;
}

async function getNameFromDappList(address: string, chainId: number): Promise<string | undefined> {
  try {
    const res = await fetch(`${DAPP_LIST_BASE_URL}/${chainId}/${getAddress(address)}.json`);
    const data = await res.json();
    return data.appName;
  } catch (e) {
    return undefined;
  }
}

async function getNameFromEthereumList(address: string, chainId: number): Promise<string | undefined> {
  try {
    const contractRes = await fetch(`${ETHEREUM_LISTS_CONTRACTS}/contracts/${chainId}/${getAddress(address)}.json`);
    const contractData = await contractRes.json();

    try {
      const projectRes = await fetch(`${ETHEREUM_LISTS_CONTRACTS}/projects/${contractData.project}.json`);
      const projectData = await projectRes.json();
      return projectData.name;
    } catch {}

    return contractData.project;
  } catch {
    return undefined;
  }
}

export function getExplorerUrl(chainId: number): string | undefined {
  const overrides: any = {
    // [ChainId.EthereumTestnetRopsten]: 'https://ropsten.etherscan.io',
    // [ChainId.EthereumTestnetKovan]: 'https://kovan.etherscan.io',
    [ChainId.SmartBitcoinCash]: 'https://smartscan.cash',
    [ChainId.Moonbeam]: 'https://moonbeam.moonscan.io',
    [ChainId.Moonriver]: 'https://moonriver.moonscan.io',
  };

  const [explorer] = chains.get(chainId)?.explorers ?? [];

  return overrides[chainId] ?? explorer?.url;
}
