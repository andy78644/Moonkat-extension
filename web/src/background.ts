import Browser from 'webextension-polyfill';
import { RequestType } from './constant';
import dataService from './dataService';
const messagePorts: { [index: string]: Browser.Runtime.Port } = {};
const approvedMessages: string[] = [];

const record = async (addr: string, url:string) => {
    let recordData = {
        TabURL:url,
        UserAddress: addr
    }
    const result = await dataService.postURL(recordData)
    .catch((err)=>{
        console.log(err)
        return err
    })
    if(result) return false
    else return true
}

/*
1. transaction
    1. transaction-assets-exchange
    // Only transaction, we can only know the status after simu
    2. transaction-assets-approval
    3. transaction-not-configured
2. signature
    1. signature-no-risk-safe
    2. signature-no-risk-malicious
    3. signature-token-approval
    4. signature-move-assets
    5. transaction-not-configured
*/

let mode: string = ""
const init = async (remotePort: Browser.Runtime.Port) => {
    let opWinId = 0
    remotePort.onMessage.addListener((msg)=>{
        console.log('dApp Message: ', msg);
        if (msg.data.signatureData){
            console.log('This is the signature request: ', msg.data.signatureData)
            record(msg.data.signatureData.signAddress ?? 'signature error', remotePort.sender?.tab?.url??'signature error')
            .then(async (res)=>{
                if(res) {
                    opWinId = await processSignatureRequest(msg, remotePort, true) ?? -1
                } else opWinId =  await processSignatureRequest(msg, remotePort, false) ?? -1
            })
        }
        else if (msg.data.transaction){
            console.log('This is the transaction request: ', msg.data.transaction)
            if (msg.data.type === RequestType.REGULAR) {
                record(msg.data.transaction.from, remotePort.sender?.tab?.url??'transaction error')
                .then(async (res)=>{
                    if(res){
                        opWinId =  await processRegularRequest(msg, remotePort, true) ?? -1
                    } else opWinId =  await processRegularRequest(msg, remotePort, false) ?? -1
                })
                return
        }
    }})

    Browser.windows.onRemoved.addListener(async (windowId)=>{
        if (opWinId != -1 && windowId === opWinId){
            remotePort.postMessage({ id: '', data: false })}
    })
}
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

const processSignatureRequest = async (msg: any, remotePort: Browser.Runtime.Port, alive: boolean) => {
    const res = await createSignatureMention(msg, alive);
    if (!res) {
        remotePort.postMessage({ id: msg.id, data: true });
        return;
    }
    messagePorts[msg.id] = remotePort;
    const opWinId = await Browser.windows.getCurrent().then((window) => window.id )
    return opWinId
}

const processRegularRequest = async (msg: any, remotePort: Browser.Runtime.Port, alive: boolean) => {
    const res = await createResult(msg, alive);
    if (!res) {
        remotePort.postMessage({ id: msg.id, data: true });
        return;
    }
    messagePorts[msg.id] = remotePort;
    const opWinId = await Browser.windows.getCurrent().then((window) => window.id )
    return opWinId
}

const createSignatureMention = async (msg: any, alive:boolean) => {
    const { id } = msg;
    const { userAddress } = msg.data
    const window = await Browser.windows.getCurrent()
    const width = 400;
    let height = 700;
    // change mode in the signature 
    if (mode === "signature-token-approval" || mode === "signature-move-assets") {
        height = 550
    }
    if(!alive) mode = 'debug-end'
    else if (msg.data.signatureData.signatureVersion) mode = msg.data.signatureData.signatureVersion
    else mode = "signature-not-configured"
    const left = window.left! + Math.round((window.width! - width) * 0.5);
    const top = window.top! + Math.round((window.height! - height) * 0.2);
    const queryString = new URLSearchParams({
        id: id,
        mode: mode,
        browserMsg: msg.data.signatureData ?? '',
        userAddress: userAddress,
      }).toString();
    await Browser.windows.create({
        url: `index.html?${queryString}`,
        type: 'popup',
        width: width,
        height: height,
        left: left,
        top: top
    })
    await Browser.windows.getCurrent()
    return true
}

const createResult = async (msg: any, alive:boolean) => {
    const { transaction, chainId, userAddress, gasPrice} = msg.data;  
    const { id } = msg;
    if(!alive) mode = 'debug-end' 
    else if (chainId === 1) mode = "transaction"
    else mode = 'wrong-chain'
    Promise.all([
        Browser.windows.getCurrent(),
    ]).then(async ([window]) => {
        const queryString = new URLSearchParams({
            id: id,
            mode: mode,
            browserMsg: JSON.stringify(transaction) ?? '',
            userAddress: userAddress,
            gasPrice: gasPrice ?? ''
          }).toString();
        const width = 400;
        const height = 700;
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
    await Browser.windows.getCurrent()
    return true
}