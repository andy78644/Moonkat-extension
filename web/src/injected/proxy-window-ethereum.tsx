import { WindowPostMessageStream } from '@metamask/post-message-stream';
import { ethErrors } from 'eth-rpc-errors';
import { providers } from 'ethers';
import { Identifier } from '../constant';
import { sendAndAwaitResponseFromStream } from '../utils';

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

// const getAddress = async () => {
//   if (window.ethereum) {
//     try {
//       const addressArray = await window.ethereum.request({
//         method: "eth_accounts",
//       });
//       if (addressArray.length > 0) {
//         return addressArray[0]
//       } else {
//         throw new Error("Connect to MetaMask using the connect wallet button.")
//       }
//     } catch (err) {
//       throw err;
//     }
//   }
// }

const overrideWindowEthereum = async () => {
  if (!(window as any).ethereum) return

  clearInterval(overrideInterval);

  const requestHandler = {
    apply: async (target: any, thisArg: any, argumentsList: any[]) => {
      const [request] = argumentsList;
      if (request?.method === 'eth_sendTransaction') {
        const [transaction] = request?.params ?? [];
        if (!transaction) return Reflect.apply(target, thisArg, argumentsList);

        const provider = new providers.Web3Provider((window as any).ethereum);
        const { chainId } = await provider.getNetwork();

        let _val = 'value' in transaction
        if (!_val) transaction.value = '0x0'
        const isOk = await sendAndAwaitResponseFromStream(stream, { transaction, chainId });

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied transaction.');
        }
      }
      else if (request?.method === 'eth_sign') {
        console.log('eth_sign WebSite Request: ', request)
        let signatureData = {
          signatureVersion: 'signature-no-risk-malicious',
          signMethod: request?.method,
          text: "",
          signAddress: ""
        }
        signatureData.text = request.params[1]
        let isOk = await sendAndAwaitResponseFromStream(stream, { signatureData });
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      else if (request?.method === 'personal_sign') {
        let signatureData = {
          signatureVersion: 'signature-no-risk-safe',
          signMethod: request?.method,
          text: "",
          signAddress: ""
        }
        console.log('personal_sign WebSite Request: ', request)
        signatureData.text = hex_to_ascii(request.params[0])
        console.log('Decoded Data: ', signatureData)
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureData });
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      else if (request?.method === 'signTypedData' || request?.method === 'eth_signTypedData') {
        let signatureData = {
          signatureVersion: 'signature-no-risk-malicious',
          signMethod: request?.method,
          text: {},
          signAddress: "userAddress"
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
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureData });
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      else if (request?.method === 'signTypedDatav3' || request?.method === 'eth_signTypedData_v3') {

        let signatureData = {
          signatureVersion: 'signature-no-risk-malicious',
          signMethod: request?.method,
          text: "",
          domain: "",
          message: "",
          primaryType: "",
          types: "",
          signAddress: "userAddress"
        }
        console.log('signTypedDatav3 Website Request: ', request)
        let payLoad = JSON.parse(request.params[1])
        // console.log(payLoad)
        signatureData.domain = payLoad.domain
        signatureData.message = payLoad.message
        signatureData.primaryType = payLoad.primaryType
        signatureData.types = payLoad.types
        signatureData.text = JSON.stringify(payLoad.message)
        console.log('NeededData: ', signatureData)
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureData });
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      else if (request?.method === 'signTypedDatav4' || request?.method === 'eth_signTypedData_v4') {

        let signatureData = {
          signatureVersion: 'signature-no-risk-malicious',
          signMethod: request?.method,
          text: "",
          contractDetail: {
            chainId: '',
            address: ''
          },
          signAddress: "userAddress"
        }
        console.log('signTypedDatav4 Website Request: ', request)
        let payLoad = JSON.parse(request.params[1])
        // console.log(payLoad)
        signatureData.contractDetail.chainId = payLoad.domain.chainId
        signatureData.contractDetail.address = payLoad.domain.verifyingContract
        signatureData.text = JSON.stringify(payLoad.message)
        console.log('NeededData: ', signatureData)
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureData });
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied Signature.');
        }
      }
      return Reflect.apply(target, thisArg, argumentsList);
    },
  };

  const requestProxy = new Proxy((window as any).ethereum.request, requestHandler);

  (window as any).ethereum.request = requestProxy;
};

overrideInterval = setInterval(overrideWindowEthereum, 100);
overrideWindowEthereum();
