import { WindowPostMessageStream } from '@metamask/post-message-stream';
import { ethErrors } from 'eth-rpc-errors';
import { providers, utils } from 'ethers';
import { Identifier } from '../constant';
import { sendAndAwaitResponseFromStream } from '../utils';

// Send data from website to content_script
const stream = new WindowPostMessageStream({
  name: Identifier.INPAGE,
  target: Identifier.CONTENT_SCRIPT,
});


let overrideInterval: NodeJS.Timer;

const hex_to_ascii = (org: string) => {
  let hex = org.toString();
  let str = '';
  if (hex.match("0[xX][0-9a-fA-F]+")) {
    hex = hex.slice(2)
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.slice(n, n + 2), 16));
    }
    return str;
  }
  return hex
}

const getAddress = async () => {
  if ((window as any).ethereum) {
    try {
      const addressArray = await (window as any).ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return addressArray[0]
      } else {
        throw new Error("Connect to MetaMask using the connect wallet button.")
      }
    } catch (err) {
      throw err;
    }
  }
}

const proxyEthereumProvider = async (ethereumProvider: any, name: string) => {
  if (!(window as any).ethereum) return

  const requestHandler = {
    apply: async (target: any, thisArg: any, argumentsList: any[]) => {
      const [request] = argumentsList;
      
      if (request?.method === 'eth_sendTransaction') {
        const userAddress = await getAddress()
        const [transaction] = request?.params ?? [];
        if (!transaction) return Reflect.apply(target, thisArg, argumentsList);

        const provider = new providers.Web3Provider((window as any).ethereum);
        const { chainId } = await provider.getNetwork();
        let gasPrice
        await provider.getFeeData()
        .then((feeData)=>{
          const price = feeData.gasPrice ?? 0
          gasPrice = utils.formatUnits(price, "gwei")
        })

        let _val = 'value' in transaction
        if (!_val) transaction.value = '0x0'
        const isOk = await sendAndAwaitResponseFromStream(stream, { transaction, chainId, userAddress, gasPrice});

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied transaction.');
        }
      }
      else if (request?.method === 'eth_sign') {
        const userAddress = await getAddress()
        console.log('eth_sign WebSite Request: ', request)
        let signatureData = {
          signatureVersion: 'signature-no-risk-malicious',
          signMethod: request?.method,
          text: "",
          signAddress: userAddress
        }
        signatureData.text = request.params[1]
        let isOk = await sendAndAwaitResponseFromStream(stream, { signatureData, userAddress});
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      else if (request?.method === 'personal_sign') {
        const userAddress = await getAddress()
        let signatureData = {
          signatureVersion: 'signature-no-risk-safe',
          signMethod: request?.method,
          text: "",
          signAddress: userAddress
        }
        console.log('personal_sign WebSite Request: ', request)
        signatureData.text = hex_to_ascii(request.params[0])
        console.log('Decoded Data: ', signatureData)
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureData, userAddress});
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      else if (request?.method === 'signTypedData' || request?.method === 'eth_signTypedData') {
        const userAddress = await getAddress()
        let signatureData = {
          signatureVersion: 'signature-712',
          signMethod: request?.method,
          text: {},
          signAddress: userAddress
        }
        console.log('signTypedData Website Request: ', request)
        let signMsg = {
          msgName: request.params[0][0].name,
          msgValue: request.params[0][0].value,
          signName: request.params[0][1].name,
          signValue: request.params[0][1].value,
        }
        signatureData.text = JSON.stringify(signMsg)
        console.log('NeededData:', signatureData)
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureData, userAddress});
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      else if (request?.method === 'signTypedDatav3' || request?.method === 'eth_signTypedData_v3') {
        const userAddress = await getAddress()
        let signatureData = {
          signatureVersion: 'signature-712',
          signMethod: request?.method,
          text: "",
          domain: "",
          message: "",
          primaryType: "",
          types: "",
          signAddress:userAddress
        }
        console.log('signTypedDatav3 Website Request: ', request)
        let payLoad = JSON.parse(request.params[1])
        signatureData.domain = payLoad.domain
        signatureData.message = payLoad.message
        signatureData.primaryType = payLoad.primaryType
        signatureData.types = payLoad.types
        signatureData.text = JSON.stringify(payLoad.message)
        console.log('NeededData: ', signatureData)
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureData, userAddress});
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      else if (request?.method === 'signTypedDatav4' || request?.method === 'eth_signTypedData_v4') {
        const userAddress = await getAddress()
        let signatureData = {
          signatureVersion: 'signature-712',
          signMethod: request?.method,
          text: "",
          domain:{},
          signAddress: userAddress
        }
        console.log('signTypedDatav4 Website Request: ', request)
        let payLoad = JSON.parse(request.params[1])
        console.log('Payload: ', payLoad)
        signatureData.domain = payLoad.domain
        signatureData.text = JSON.stringify(payLoad.message)
        console.log('NeededData: ', signatureData)
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureData, userAddress});
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      return Reflect.apply(target, thisArg, argumentsList);
    },
  };

  const requestProxy = new Proxy((window as any).ethereum.request, requestHandler);
  
  (window as any).ethereum?.providers?.forEach((provider: any, i: number) => {
    //proxyEthereumProvider(provider, `window.ethereum.providers[${i}]`);
    new Proxy(provider.request, requestHandler);
  });
  Object.defineProperty(ethereumProvider, 'request', {
    value: new Proxy(ethereumProvider.request, requestHandler),
    writable: true,
  });

  (window as any).ethereum.request = requestProxy;

};

const proxyAllEthereumProviders = () => {
  if (!(window as any).ethereum) return
  clearInterval(overrideInterval);

  // Proxy the default window.ethereum provider
  proxyEthereumProvider((window as any).ethereum, 'window.ethereum');

  // Proxy any other providers listed on the window.ethereum object
  (window as any).ethereum?.providers?.forEach((provider: any, i: number) => {
    proxyEthereumProvider(provider, `window.ethereum.providers[${i}]`);
  });
};

overrideInterval = setInterval(proxyAllEthereumProviders, 100);
proxyAllEthereumProviders();
 