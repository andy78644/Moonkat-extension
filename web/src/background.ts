import Browser from "webextension-polyfill";
import { RequestType } from "./constant";
import dataService from "./dataService";
const messagePorts: { [index: string]: Browser.Runtime.Port } = {};
const approvedMessages: string[] = [];
const record = async (
    addr: string,
    url: string,
    msg_id: number,
    contractAddr: string,
    simulationResult: JSON
) => {
    let recordData = {
        TabURL: url,
        UserAddress: addr,
        ContractAddress: contractAddr,
        msgId: msg_id,
        Behavior: "close",
        SimulationResult: simulationResult,
    };
    const result = await dataService.postRecordDataURL(recordData, "info").catch((err) => {
        return err;
    });
    if (result) return false;
    else return true;
};

let mode: string = "";
const init = async (remotePort: Browser.Runtime.Port) => {
    let opWinId = 0;
    remotePort.onMessage.addListener((msg) => {
        if (msg.data.signatureData) {
            record(
                msg.data.signatureData.signAddress ?? "signature error",
                remotePort.sender?.tab?.url ?? "signature error",
                msg.id ?? "msgId error",
                "signature",
                msg.data.signatureData.payLoad
            ).then(async (res) => {
                if (res) {
                    opWinId =
                        (await processSignatureRequest(msg, remotePort, true)) ?? -1;
                } else
                    opWinId =
                        (await processSignatureRequest(msg, remotePort, false)) ?? -1;
            });
        } else if (msg.data.transaction) {
            if (msg.data.type === RequestType.REGULAR) {
                record(
                    msg.data.transaction.from,
                    remotePort.sender?.tab?.url ?? "transaction error",
                    msg.id ?? "msgId error",
                    msg.data.transaction.to,
                    JSON.parse("{}")
                ).then(async (res) => {
                    if (res) {
                        opWinId =
                            (await processRegularRequest(msg, remotePort, true)) ?? -1;
                    } else
                        opWinId =
                            (await processRegularRequest(msg, remotePort, false)) ?? -1;
                });
                return;
            }
        }
    });
    Browser.windows.onRemoved.addListener(async (windowId) => {
        if (opWinId != -1 && windowId === opWinId) {
            remotePort.postMessage({ id: "", data: false });
        }
    });
};
// Entry
Browser.runtime.onConnect.addListener(init);
Browser.runtime.onMessage.addListener((data) => {
    const responsePort = messagePorts[data.id];
    if (data.data) {
        approvedMessages.push(data);
    }
    if (responsePort) {
        responsePort.postMessage(data);
        delete messagePorts[data.id];
    }
});

const processSignatureRequest = async (
    msg: any,
    remotePort: Browser.Runtime.Port,
    alive: boolean
) => {
    const res = await createSignatureMention(msg, alive);
    if (!res) {
        remotePort.postMessage({ id: msg.id, data: true });
        return;
    }
    messagePorts[msg.id] = remotePort;
    const opWinId = await Browser.windows
        .getCurrent()
        .then((window) => window.id);
    return opWinId;
};

const processRegularRequest = async (
    msg: any,
    remotePort: Browser.Runtime.Port,
    alive: boolean
) => {
    const res = await createResult(msg, alive);
    if (!res) {
        console.log('110', res)
        remotePort.postMessage({ id: msg.id, data: true });
        return;
    }
    messagePorts[msg.id] = remotePort;
    const opWinId = await Browser.windows
        .getCurrent()
        .then((window) => window.id);
    return opWinId;
};

const createSignatureMention = async (msg: any, alive: boolean) => {
    const { id } = msg;
    const { userAddress } = msg.data;
    console.log('bacl: ', msg.data)
    const window = await Browser.windows.getCurrent();
    const width = 400;
    let height = 700;
    const left = window.left! + Math.round((window.width! - width) * 0.5);
    const top = window.top! + Math.round((window.height! - height) * 0.2);
    if (!alive) mode = "debug-end";
    else if (msg.data.signatureData.signatureVersion)
        mode = msg.data.signatureData.signatureVersion;
    else mode = "signature-no-risk-safe";
    const queryString = new URLSearchParams({
        id: id,
        mode: mode,
        browserMsg: JSON.stringify(msg.data.signatureData) ?? "",
        userAddress: userAddress,
    }).toString();
    await Browser.windows.create({
        url: `index.html?${queryString}`,
        type: "popup",
        width: width,
        height: height,
        left: left,
        top: top,
    });
    await Browser.windows.getCurrent();
    return true;
};

const createResult = async (msg: any, alive: boolean) => {
    const { transaction, chainId, userAddress, gasPrice } = msg.data;
    const { id } = msg;
    console.log('bacl 154: ', msg.data)
    if (!alive) mode = "debug-end";
    if (chainId !== 1) return false
    else mode = 'transaction'
    const window = await Browser.windows.getCurrent();
    const width = 400;
    const height = 700;
    const left = window.left! + Math.round((window.width! - width) * 0.5);
    const top = window.top! + Math.round((window.height! - height) * 0.2);

    const queryString = new URLSearchParams({
        id: id,
        mode: mode,
        browserMsg: JSON.stringify(transaction) ?? "",
        userAddress: userAddress,
        gasPrice: gasPrice ?? "",
    }).toString();

    await Browser.windows.create({
        url: `index.html?${queryString}`,
        type: "popup",
        width: width,
        height: height,
        left: left,
        top: top,
    });
    await Browser.windows.getCurrent();
    return true;
};
