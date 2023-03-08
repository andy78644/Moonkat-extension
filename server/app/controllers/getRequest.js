const axios = require('axios');
const EtherscanAPI = require("etherscan-api");

module.exports.getRequest = async function(query, address, apiKey){
    let api = EtherscanAPI.init(apiKey);
      
    let ret = {
      LastTransaction: null,
      CreateTransaction: null,
      TokenInfo: null,
      Balance: null,
      TransactionCount: null
    };

    ret.LastTransaction = api.account.txlist(address, 1, 'latest', 1, 1, 'desc');
    ret.CreateTransaction = api.account.txlist(address, 1, 'latest', 1, 1, 'asc');
    ret.TokenInfo = new Promise(function(resolve, reject) {
      axios.get(`https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${address}&apikey=${apiKey}`).then(function(response) {
          resolve(response.data);
        }).catch(function(error){
          //console.log("test");
          reject(new Error(error));
        });
    });
    ret.TransactionCount = api.proxy.eth_getTransactionCount(address, 'latest');
    ret.Balance = api.account.balance(address);
    return Promise.all([ret.Balance, ret.TokenInfo, ret.LastTransaction, ret.CreateTransaction, ret.TransactionCount]).then( () => {
      return ret;
    })
    .catch(err => {
      return ret;
    });
}

