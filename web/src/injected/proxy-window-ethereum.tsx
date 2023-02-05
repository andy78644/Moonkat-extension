// This 
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

const hex_to_ascii = (str1:string) =>{
 var hex  = str1.toString();
 var str = '';
 for (var n = 0; n < hex.length; n += 2) {
   str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
 }
 return str;
}

const overrideWindowEthereum = () => {
  if (!(window as any).ethereum) return;

  clearInterval(overrideInterval);

  // TODO: Proxy send and sendAsync
  // https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
  // TODO: eth.send (Deprecrated API)

  const requestHandler = {
    apply: async (target: any, thisArg: any, argumentsList: any[]) => {
      const [request] = argumentsList;
      if (request?.method === 'eth_sendTransaction') {
        const [transaction] = request?.params ?? [];
        transaction['request_method'] = request.method
        if (!transaction) return Reflect.apply(target, thisArg, argumentsList);

        const provider = new providers.Web3Provider((window as any).ethereum);
        const { chainId } = await provider.getNetwork();
        let _val = 'value' in transaction
        if (!_val){
            transaction.value = 0
        } 
        const isOk = await sendAndAwaitResponseFromStream(stream, { transaction, chainId });

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: User denied transaction.');
        }
      }
      else if (request?.method === 'signTypedDataV3' || request?.method === 'eth_signedDataV3') {
        console.log('eth_signV3: ', request)
      }
      else if (request?.method === 'eth_sign') {
        // This is the danger signature way
        console.log('eth_sign: ', request)
        let signatureType = {
          status: 'danger',
          signMethod: 'eth_sign',
          text: ""
        }
        signatureType.text = hex_to_ascii(request.params[0])
        let isOk = await sendAndAwaitResponseFromStream(stream, { signatureType });
        isOk = false
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: Signature Data Sending Error.');
        }
      }
      else if (request?.method === 'personal_sign') {
        console.log('personal_sign: ', request)
        let signatureType = {
          status: 'need notice',
          signMethod: 'personal_sign',
          text: ""
        }
        signatureType.text = hex_to_ascii(request.params[0])
        console.log(signatureType)
        const isOk = await sendAndAwaitResponseFromStream(stream, { signatureType });
        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('Moonkat: Signature Data Sending Error.');
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
