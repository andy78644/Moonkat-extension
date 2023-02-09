import Browser from 'webextension-polyfill';
import { RequestType } from './constant';
import dataService from './dataService';
const messagePorts: { [index: string]: Browser.Runtime.Port } = {};
const approvedMessages: string[] = [];

const init = async (remotePort: Browser.Runtime.Port) => {
    remotePort.onMessage.addListener(async (msg)=>{
        console.log('DApp Message: ', msg);
        if (msg.data.signatureData){
            console.log('This is the signature request: ', msg.data.signatureData)
            processSignatureRequest(msg, remotePort)
        }
        else if (msg.data.transaction){
            console.log('This is the transaction request: ', msg.data.transaction)
            if (msg.data.type === RequestType.REGULAR) {
                processRegularRequest(msg, remotePort);
                return;
            }
            if (msg.data.type === RequestType.BYPASS_CHECK) {
                processBypassRequest(msg, remotePort);
                return;
            }
        }
    });
};

// Entry
Browser.runtime.onConnect.addListener(init);

Browser.runtime.onMessage.addListener((data)=>{
    const responsePort = messagePorts[data.id];
    if(data.data) {
        approvedMessages.push(data);
    }
    if(responsePort) {
        responsePort.postMessage(data);
        delete messagePorts[data.id];
        return;
    }
})

const processSignatureRequest = (msg: any, remotePort: Browser.Runtime.Port) => {
    const res = createSignatureMention(msg);
    if (!res) {
        remotePort.postMessage({ id: msg.id, data: true });
        return;
    }
    messagePorts[msg.id] = remotePort;
};

const processRegularRequest = (msg: any, remotePort: Browser.Runtime.Port) => {
    const res = createResult(msg);
    if (!res) {
        remotePort.postMessage({ id: msg.id, data: true });
        return;
    }
    messagePorts[msg.id] = remotePort;
};

const processBypassRequest = (msg: any, remotePort: Browser.Runtime.Port) => {
    const res = createResult(msg);
    if (!res) { return };
};

const createSignatureMention = async (msg:any) => {
    const window = await Browser.windows.getCurrent()
    const width = 500;
    const height = 750;
    const left = window.left! + Math.round((window.width! - width) * 0.5);
    const top = window.top! + Math.round((window.height! - height) * 0.2);
    console.log(msg)
    const queryString = new URLSearchParams({
        context: msg.data.signatureData.text,
        signatureVersion: msg.data.signatureData.signatureVersion,
        signMethod:msg.data.signatureData.signMethod,
        id: msg.id
    })
    const popupWindow = await Browser.windows.create({
        url: `tmp.html?${queryString}`,
        type: 'popup',
        width: width,
        height: height,
        left: left,
        top: top
    });
}
const createResult = async (msg: any) => {
    const { transaction, chainId } = msg.data;
    let previewTxn = await dataService.postTransactionSimulation(transaction)
    // since the alchemy may be can decode the approval, so first let go the decodeApproval function
    // const allowance = decodeApproval(transaction.data ?? '', transaction.to ?? '');
    // if (!allowance) return;
    // if (approvedMessages.includes(msg.id)) return false;
    // const rpcUrl = getRpcUrl(chainId, EthRPC); 
    Promise.all([
        // getTokenData(allowance.asset, new providers.JsonRpcProvider(rpcUrl)),
        // addressToAppName(allowance.spender, chainId),
        Browser.windows.getCurrent(),
    ]).then(async ([window]) => {
        const queryString = new URLSearchParams({
          id: msg.id,
          asset: 'Test Asset',
          spender: 'Test Spender',
          chainId,
          name: 'Test Name' ?? '',
          symbol: 'Test Symbol' ?? '',
          assetOut: previewTxn.out,
          assetIn: previewTxn.in,
          gas: previewTxn.gas,
          outSymbol: previewTxn.outSymbol,
          inSymbol:previewTxn.inSymbol,
          tokenURL: previewTxn.tokenURL,
        //   spenderName: spenderName ?? '',
          bypassed: msg.data.type === RequestType.BYPASS_CHECK ? 'true' : 'false',
        }).toString();
        
        const width = 500;
        const height = 750;
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
    