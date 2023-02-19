import Browser from 'webextension-polyfill';
import { RequestType } from './constant';
import dataService from './dataService';
const messagePorts: { [index: string]: Browser.Runtime.Port } = {};
const approvedMessages: string[] = [];
const record = (addr: string, url:string) => {
    let recordData = {
        TabURL:url,
        UserAddress: addr
    }
    dataService.postURL(recordData)
    .catch((err)=>{
        console.log('Record Function Down')
        return
    })
}
/*
1. transaction
    1. transaction-assets-exchange
    2. transaction-assets-approval
2. signature
    1. signature-no-risk-safe
    2. signature-no-risk-malicious
    3. signature-token-approval
    4. signature-move-assets
    5. signature-not-detected
*/
let mode: string = "transaction-assets-exchange"

const init = async (remotePort: Browser.Runtime.Port) => {
    remotePort.onMessage.addListener(async (msg)=>{
        console.log('dApp Message: ', msg);
        if (msg.data.signatureData){
            console.log('This is the signature request: ', msg.data.signatureData)
            record('Test signature', remotePort.sender?.tab?.url??'Error')
            processSignatureRequest(msg, remotePort)
        }
        else if (msg.data.transaction){
            console.log('This is the transaction request: ', msg.data.transaction)
            if (msg.data.type === RequestType.REGULAR) {
                record(msg.data.transaction.from, remotePort.sender?.tab?.url??'Error')
                processRegularRequest(msg, remotePort);
                return;
            }
            if (msg.data.type === RequestType.BYPASS_CHECK) {
                record(msg.data.transaction.from, remotePort.sender?.tab?.url??'Error')
                processBypassRequest(msg, remotePort);
                return;
            }
    }
})}
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

const createSignatureMention = async (msg: any) => {
    const { id, data } = msg;
    const window = await Browser.windows.getCurrent()
    const width = 360;
    let height = 600;
    // change mode in the signature 
    if (mode === "signature-token-approval" || mode === "signature-move-assets") {
        height = 550
    }
    if (msg.data.signatureData.signatureVersion === 'Safe'){
        mode = "signature-no-risk-safe"
    }
    else {
        mode = "signature-no-risk-malicious"
    }
    const left = window.left! + Math.round((window.width! - width) * 0.5);
    const top = window.top! + Math.round((window.height! - height) * 0.2);
    const queryString = new URLSearchParams({
        id: id,
        mode: mode,
        browserMsg: msg.data.signatureData,
      }).toString();
    await Browser.windows.create({
        url: `index.html?${queryString}`,
        type: 'popup',
        width: width,
        height: height,
        left: left,
        top: top
    });
}
const createResult = async (msg: any) => {
    const { transaction, chainId } = msg.data;  
    const { id, data } = msg;
    mode = "transaction-assets-exchange"
    Promise.all([
        Browser.windows.getCurrent(),
    ]).then(async ([window]) => {
        const queryString = new URLSearchParams({
            id: id,
            mode: mode,
            browserMsg: JSON.stringify(transaction) ?? 'error',
          }).toString();
        const width = 360;
        const height = 600;
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
    