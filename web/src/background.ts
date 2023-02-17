import Browser from 'webextension-polyfill';
import { RequestType } from './constant';
import dataService from './dataService';
const messagePorts: { [index: string]: Browser.Runtime.Port } = {};
const approvedMessages: string[] = [];

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

const mode: string = "signature-move-assets"

const init = async (remotePort: Browser.Runtime.Port) => {
    remotePort.onMessage.addListener(async (msg)=>{
        console.log(msg);
        if (mode.split('-')[0] === 'transaction'){
            console.log('This is the transaction request');
            processRegularRequest(msg, remotePort)
        }
        else if (mode.split('-')[0] === 'signature'){
            console.log('This is the signature request');
            processSignatureRequest(msg, remotePort);
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

const createSignatureMention = async (msg: any) => {
    const { id, data } = msg;
    const window = await Browser.windows.getCurrent()
    const width = 360;
    let height = 600;
    console.log(mode)
    console.log(mode in ["signature-token-approval", "signature-move-assets"]);
    if (mode === "signature-token-approval" || mode === "signature-move-assets") {
        height = 550
        console.log('hi')
    }
    const left = window.left! + Math.round((window.width! - width) * 0.5);
    const top = window.top! + Math.round((window.height! - height) * 0.2);
    const queryString = new URLSearchParams({
        id: id,
        mode: mode,
        browserMsg: data,
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
    const { id, data } = msg;
    Promise.all([
        Browser.windows.getCurrent(),
    ]).then(async ([window]) => {
        const queryString = new URLSearchParams({
            id: id,
            mode: mode,
            browserMsg: data,
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
    