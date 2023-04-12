import { WindowPostMessageStream } from '@metamask/post-message-stream';
import { sendAndAwaitResponseFromPort } from '../utils';
import { Identifier } from '../constant';
import Browser from "webextension-polyfill";

// Send data from content_script to website
const dataStream = new WindowPostMessageStream({
    name: Identifier.CONTENT_SCRIPT,
    target: Identifier.INPAGE,
});

// Get the website data and build the connection
dataStream.on('data', (data) => {
    // Connect with extension
    const extensionPort = Browser.runtime.connect({
        name: Identifier.CONTENT_SCRIPT,
    });
    // Send from website to the extension
    sendAndAwaitResponseFromPort(extensionPort, { ...data.data })
    .then((response) => {
        // Send back to the website
        if(response==='close'){
            dataStream.write({ id: data.id, data: false });
        }
        dataStream.write({ id: data.id, data: response });
    })
});