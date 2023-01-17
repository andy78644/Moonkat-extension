import { WindowPostMessageStream } from '@metamask/post-message-stream';
import { sendAndAwaitResponseFromPort } from '../utils';
import {Identifier, RequestType} from '../constant';
import Browser from "webextension-polyfill";

// connect to the page
const dataStream = new WindowPostMessageStream({
    name: Identifier.CONTENT_SCRIPT,
    target: Identifier.INPAGE,
});

dataStream.on('data', (data) => {
    const extensionPort = Browser.runtime.connect({
        name: Identifier.CONTENT_SCRIPT,
    });
    sendAndAwaitResponseFromPort(extensionPort, { ...data.data, type: RequestType.REGULAR}).then((response) => {
        dataStream.write({ id: data.id, data: response });
    });
});