import Browser from 'webextension-polyfill';
import { RequestType } from './constant';
import dataService from './dataService';
const messagePorts: { [index: string]: Browser.Runtime.Port } = {};
const approvedMessages: string[] = [];

const init = async (remotePort: Browser.Runtime.Port) => {
    remotePort.onMessage.addListener(async (msg)=>{
        console.log('Request sender information: ', remotePort.sender)
        console.log('Request sender url: ', remotePort.sender?.url)
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

const processBypassRequest = async (msg: any, remotePort: Browser.Runtime.Port) => {
    const res = await createResult(msg);
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
    await Browser.windows.create({
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
    .catch((err)=>{
        console.log('Server is down: ', err)
        return false
    })
    // since the alchemy may be can decode the approval, so first let go the decodeApproval function
    Promise.all([
        Browser.windows.getCurrent(),
    ]).then(async ([window]) => {
        const queryString = new URLSearchParams({
          id: msg.id,
          asset: 'Test Asset',
          contract: transaction.to,
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
          bypassed: msg.data.type === RequestType.BYPASS_CHECK ? 'true' : 'false',
        }).toString();
        
        const width = 500;
        const height = 750;
        const left = window.left! + Math.round((window.width! - width) * 0.5);
        const top = window.top! + Math.round((window.height! - height) * 0.2);
    
        await Browser.windows.create({
          url: `index.html?${queryString}`,
          type: 'popup',
          width: width,
          height: height,
          left: left,
          top: top
        });
      })
      return true;
};
    