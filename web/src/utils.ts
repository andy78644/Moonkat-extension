import { Duplex } from "readable-stream";
import Browser from "webextension-polyfill";
import objectHash from "object-hash";


export const sendAndAwaitResponseFromPort = (stream: Browser.Runtime.Port, data: any): Promise<any> => {
    return new Promise((resolve) => {
        let hashdata = data.transaction ?? data;
        let timestamp = Date.now()
        hashdata = { timestamp, hashdata}
        const id = objectHash(hashdata);
        stream.postMessage({id, data});
        const callback = (res: any) => {
            if(res.id === id){
                stream.onMessage.removeListener(callback);
                resolve(res.data);
            }
            else{
              stream.onMessage.removeListener(callback);
              resolve('close');
            }
        };
        // Listen the extension response
        stream.onMessage.addListener(callback);
    });
}


export const sendAndAwaitResponseFromStream = (stream: Duplex, data: any): Promise<any> => {
    return new Promise((resolve) => {
      let hashdata = data.transaction ?? data;
      let timestamp = Date.now()
      hashdata = { timestamp, hashdata}
      const id = objectHash(hashdata);
      stream.write({ id, data });
      const callback = (response: any) => {
        if (response.id === id) {
          stream.off('data', callback);
          resolve(response.data);
        }
      };
      // Response to requestHandler
      stream.on('data', callback);
    });
}
