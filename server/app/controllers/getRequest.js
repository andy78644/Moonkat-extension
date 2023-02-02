const axios = require('axios');
const { resolve } = require('path');
const util = require('util');
const EtherscanAPI = require("etherscan-api");
/**
 * @param {string} chain
 * @returns {string}
 */
/*function pickChainUrl(chain) {
  if (!chain || !TESTNET_API_URL_MAP[chain]) {
    return MAIN_API_URL;
  }

  return TESTNET_API_URL_MAP[chain];
}


const MAIN_API_URL = 'https://api.polygonscan.com';
const TESTNET_API_URL_MAP = {
  mumbai: 'https://api-testnet.polygonscan.com',
};
*/


module.exports.getRequest = async function(query, address, apiKey){
    api = EtherscanAPI.init(apiKey);

    var client = axios.create({
        baseURL: 'https://api.etherscan.io',
        //timeout: timeout
      });
      
    var ret = {
      LastTransaction: null,
      CreateTransaction: null,
      TokenInfo: null,
      Balance: null,
      TransactionCount: null
    };

    ret.LastTransaction = api.account.txlist(address, 1, 'latest', 1, 1, 'desc');
    
    // new Promise(function(resolve, reject) {
    //     axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=desc
    //     &apikey=${apiKey}`).then(function(response){
    //       data = response.data;
    //       console.log(data)
    //       resolve(data);
    //     }).catch(function(error) {
    //       return reject(new Error(error));
    //     });
    //   });
    
    ret.CreateTransaction = api.account.txlist(address, 1, 'latest', 1, 1, 'asc');
    
    // new Promise(function(resolve, reject) {
    //     axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc
    //     &apikey=${apiKey}`).then(function(response){
    //     data = response.data;
    //     console.log(data)
    //     resolve(data);
    //   }).catch(function(error) {
    //     return reject(new Error(error));
    //   });
    // });

    ret.TokenInfo = new Promise(function(resolve, reject) {
      axios.get(`https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${address}&apikey=${apiKey}`).then(function(response) {
          data = response.data;
          resolve(data);
        }).catch(function(error){
          //console.log("test");
          reject(new Error(error));
        });
    });
    
    ret.TransactionCount = api.proxy.eth_getTransactionCount(address, 'latest');

    ret.Balance = api.account.balance(address);
    // new Promise(function(resolve, reject) {
    //   axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`).then(function(response) {
    //     data = response.data;
    //     resolve(data);
    //   }).catch(function(error){
    //     return reject(new Error(error));
    //   });
    // });

    return Promise.all([ret.Balance, ret.TokenInfo, ret.LastTransaction, ret.CreateTransaction, ret.TransactionCount]).then( () => {
      return ret;
    })
    .catch(err => {
      return ret;
    });;
}

