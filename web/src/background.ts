import Browser from 'webextension-polyfill';
import contractData from './types/contractType';
import dataService from './dataService';
import { providers } from 'ethers';
import { RequestType, EthRPC} from './constant';
import { decodeApproval, getRpcUrl, getTokenData, getApiData, addressToAppName} from './utils';
import { PassThrough } from 'readable-stream';

const messagePorts: { [index: string]: Browser.Runtime.Port } = {};
const approvedMessages: string[] = [];

const init = async (remotePort: Browser.Runtime.Port) => {
    // console.log(remotePort.sender)
    remotePort.onDisconnect.addListener((msg)=>{
        // console.log('Disconnect: ', msg);
    });
    remotePort.onMessage.addListener((msg)=>{
        // console.log('DApp Message: ', msg);
        if (msg.data.type === RequestType.REGULAR) {
            // console.log('regular request.');
            // console.log(msg);
            processRegularRequest(msg, remotePort);
            return;
        }
        if (msg.data.type === RequestType.BYPASS_CHECK) {
            // console.log('bypass request');
            processBypassRequest(msg, remotePort);
            return;
        }
    });
};

// Entry
Browser.runtime.onConnect.addListener(init);

Browser.runtime.onMessage.addListener((data)=>{
    const responsePort = messagePorts[data.id];
    // console.log('onMessage Listener: ', data);
    
    if(data.data) {
        approvedMessages.push(data);
    }

    if(responsePort) {
        responsePort.postMessage(data);
        delete messagePorts[data.id];
        return;
    }
})

const processRegularRequest = (msg: any, remotePort: Browser.Runtime.Port) => {
    // console.log("In processRegularRequest: ");
    // console.log(msg);
    const res = createResult(msg);
    if (!res) {
        remotePort.postMessage({ id: msg.id, data: true });
        return;
    }
    // Store the remote port so the response can be sent back there
    messagePorts[msg.id] = remotePort;
};

const processBypassRequest = (msg: any, remotePort: Browser.Runtime.Port) => {
    const res = createResult(msg);
    if (!res) { return };
};

const createResult = (msg: any) => {
    console.log(msg);
    const { transaction, chainId } = msg.data;
    const allowance = decodeApproval(transaction.data ?? '', transaction.to ?? '');
    // console.log("allowance asset: " + allowance?.asset);
    // console.log("allowance spender: " + allowance?.spender);
    if (!allowance) return;
    if (approvedMessages.includes(msg.id)) return false;
    const rpcUrl = getRpcUrl(chainId, EthRPC);
    Promise.all([
        getTokenData(allowance.asset, new providers.JsonRpcProvider(rpcUrl)),
        // addressToAppName(allowance.spender, chainId),
        Browser.windows.getCurrent(),
    ]).then(async ([tokenData, window]) => {
        const queryString = new URLSearchParams({
          id: msg.id,
          asset: allowance.asset,
          spender: allowance.spender,
          chainId,
          name: tokenData.name ?? '',
          symbol: tokenData.symbol ?? '',
        //   spenderName: spenderName ?? '',
          bypassed: msg.data.type === RequestType.BYPASS_CHECK ? 'true' : 'false',
        }).toString();
        // console.log('URL Param Data: ', queryString)
        
        const width = 400;
        const height = 600;
        const left = window.left! + Math.round((window.width! - width) * 0.5);
        const top = window.top! + Math.round((window.height! - height) * 0.2);
    
        const popupWindow = await Browser.windows.create({
          url: `index.html?${queryString}`,
          type: 'popup',
          width: width,
          height: height,
          left: left,
          top: top
        });
    
        // Specifying window position does not work on Firefox, so we have to reposition after creation (6 y/o bug -_-).
        // Has no effect on Chrome, because the window position is already correct.
        // await Browser.windows.update(popupWindow.id!, { width, height, left, top });
      });
      return true;
};
    