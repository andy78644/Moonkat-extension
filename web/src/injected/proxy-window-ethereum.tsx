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

const overrideWindowEthereum = () => {
  if (!(window as any).ethereum) return;

  clearInterval(overrideInterval);

  // TODO: Proxy send and sendAsync
  // https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
  // TODO: eth.send (Deprecrated API)

  const requestHandler = {
    apply: async (target: any, thisArg: any, argumentsList: any[]) => {
      const [request] = argumentsList;
      console.log(request.method)
      if (request?.method === 'eth_sendTransaction') {
        const [transaction] = request?.params ?? [];
        transaction['request method'] = request.method
        if (!transaction) return Reflect.apply(target, thisArg, argumentsList);

        const provider = new providers.Web3Provider((window as any).ethereum);
        const { chainId } = await provider.getNetwork();
        const isOk = await sendAndAwaitResponseFromStream(stream, { transaction, chainId });

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest('ComPas: User denied transaction signature.');
        }
      }
      else if (request?.method === 'eth_signedDataV3' || request?.method === 'eth_signedDataV3') {

      }
      else if (request?.method === 'eth_sign' || request?.method === 'personal_sign') {

      }
      // TODO: Handle with the different request type
      return Reflect.apply(target, thisArg, argumentsList);
    },
  };

  const requestProxy = new Proxy((window as any).ethereum.request, requestHandler);

  (window as any).ethereum.request = requestProxy;
};

overrideInterval = setInterval(overrideWindowEthereum, 100);
overrideWindowEthereum();
