import { WindowPostMessageStream } from '@metamask/post-message-stream';
import { sendAndAwaitResponseFromPort } from '../utils';
import { Identifier, RequestType } from '../constant';
import Browser from "webextension-polyfill";

// connect to the page
const dataStream = new WindowPostMessageStream({
    name: Identifier.CONTENT_SCRIPT,
    target: Identifier.INPAGE,
});

// Get the website data and build the connection
dataStream.on('data', (data) => {
    // Connect with content script(website) and the extension
    const extensionPort = Browser.runtime.connect({
        name: Identifier.CONTENT_SCRIPT,
    });
    // Send the website to the extension
    sendAndAwaitResponseFromPort(extensionPort, { ...data.data, type: RequestType.REGULAR})
    .then((response) => {
        // Here is send the content script response to front window
        if(response==='close'){
            dataStream.write({ id: data.id, data: false });
        }
        dataStream.write({ id: data.id, data: response });
    })
});