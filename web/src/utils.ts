import { Duplex } from "readable-stream";
import Browser from "webextension-polyfill";
import objectHash from "object-hash";


export const sendAndAwaitResponseFromPort = (stream: Browser.Runtime.Port, data: any): Promise<any> => {
    return new Promise((resolve) => {
        const id = objectHash(data.transaction ?? data);
        stream.postMessage({id, data});
        const callback = (res: any) => {
            if(res.id === id){
                stream.onMessage.removeListener(callback);
                resolve(res.data);
            }
        };
        // Trace the message and execute callback function
        stream.onMessage.addListener(callback);
    });
}


export const sendAndAwaitResponseFromStream = (stream: Duplex, data: any): Promise<any> => {
    return new Promise((resolve) => {
      const id = objectHash(data.transaction ?? data);
      stream.write({ id, data });
  
      const callback = (response: any) => {
        if (response.id === id) {
          stream.off('data', callback);
          resolve(response.data);
        }
      };
  
      stream.on('data', callback);
    });
}
