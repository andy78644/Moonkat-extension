import GT4 from './local';

const postEvent = () => {
    return new Promise((resolve, reject) => {
        GT4.post(``, { 
              "client_id":"8888888",
              "non_personalized_ads":false,
              "events":[
                {
                  "name":"milkshakebro_test",
                  "params":{
                    "items":[],
                    "test_param":"milkshakebro_123"
                  }
                }
              ]
        }).then((res) => {
            console.log(res);
            resolve(res);
        }).catch((err) => {
            console.log(err);
            reject(err);
        })
    });
}

const extensionGTM = {
    postEvent,
}

export default extensionGTM;