const db = require("../models");
const { Contract }= db;
const Op = db.Sequelize.Op;
const querystring = require('querystring');
const getData = require('./getRequest.js');
const { create } = require("domain");
const Web3 = require('web3');
const web3 = new Web3();
//const db = require("../models");
//const Contract = db.Contract;

// polygen api key
// apiKey = 'NE2VP5S89SW4TGJSZPCKZHZN2NZ9XKWY4P'

// etherscan api key
const apiKey = 'EEV1NJ6VXV6J86UQ4YXQW77F1N7CJ9SMRY'


// Get the Contract with Specific Address
exports.getByAddress = async (req, res) => {
  const address = req.query.address;
  //for test
  //const address = '0x388C818CA8B9251b393131C08a736A67ccB19297'
                  
  //const chainID = req.query.chainID;

  
  const contract = await Contract.findByPk(address);
  // const allcontract = await Contract.findAll();
  // console.log(allcontract)
  var res_contract = {
    ContractAddress: address,
    ContractName: null,
    ContractLink: null,
    CreatorLastTransactionTime: null,
    CreatorCreateTime: null,
    TokenLastTransactionTime: null,
    TokenCreateTime: null,
    TokenType: null,
    Holders: null,
    CreatorBalance: null,
    CreatorAddress: null,
    CreatorTransactionCount: null,
    TokenTransactionCount: null
  }
  if(contract){
    resdata = JSON.stringify(contract);
    console.log(resdata)
    res_contract.TokenType = contract.TokenType;
    res_contract.Holders = contract.Holders;
    res_contract.TokenCreateTime = contract.CreateTime;
    res_contract.TokenLastTransactionTime = contract.LastTransactionTime;
    res_contract = JSON.stringify(res_contract);
    res.status(200).send(res_contract);
  } 
  else{
    var query = null;
    // querystring.stringify({
    //   module, action, address, sort, apiKey
    // });


    var set_up_contract = {
      Address: address,
      LastTransactionTime: null,
      CreateTime: null,
      TokenType: null,
      Holders: null,
      Balance: null,
      NumberOfTransaction: null
    }

    const api = new Promise(async function(resolve, reject) {
      const data = await getData.getRequest(query, address, apiKey);
      resolve(data);
    }).catch(err => {
      reject(new Error(err));
    });

    api
    .then( api_data=>{
      api_data.LastTransaction.then(function(data){
        const transactions = data.result;
        const latesttransaction = transactions[0];
        const date = new Date(latesttransaction.timeStamp*1000);
        set_up_contract.LastTransactionTime = date;
        // console.log(date)
      });


      api_data.CreateTransaction.then(function(data){
        const transactions = data.result;
        const latesttransaction = transactions[0];
        const date = new Date(latesttransaction.timeStamp*1000);
        set_up_contract.CreateTime = date;
        // console.log(date)
      });

      api_data.TransactionCount.then(function(data){
        const transcount = parseInt(data.result, 16).toString(10);
        set_up_contract.NumberOfTransaction = transcount;
        // console.log(date)
      });

      var tokentype = "";
      api_data.TokenInfo.then( data => {
        const valid = data.message;
        if (valid == "OK"){
          tokentype = data.result["TokenType"];
        } else{
          tokentype = data.result;
        }
        set_up_contract.TokenType = tokentype;
      });

      api_data.Balance.then( data => {
        const balance = web3.utils.fromWei( data.result, "ether");;
        set_up_contract.Balance = balance;
      });
    })
    .then(() => {
      contract_data = JSON.stringify(set_up_contract);
      console.log(set_up_contract);
      Contract.create(set_up_contract)
        .then(contract_data => {
          res.send(contract_data)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "error"
          });
        })
    })
  }
  /*
  .then(contract => {
    if(contract){
      res.send(JSON.stringify(contract));
    } 
    else {
      console.log("not found")
      var query = querystring.stringify({
        module, action, tag, address, apiKey
      });
      var api = getData.getRequest(query);
      api
      .then(function(data){
        const contract = {
          Address: address,
          Balance: data["result"],
        }
        data = JSON.stringify(data);
        Contract.create(contract)
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "error"
          });
        })
        
      });
    }
  })
  */
  
}; 


/*
  console.log('Start Getting Contract Address: ' + address)
  Contract.findByPk(address)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Cannot find Contract with address: " + address
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error: " + err + " Error Retrieving Contract with address: " + address
    });
  });
  */


/*
module.exports = function(getRequest, apiKey) {
  return {
    /**
     * Returns the ABI/Interface of a given contract
     * @param {string} address - Contract address
     * @example
     * api.contract
     *  .getabi('0x2791bca1f2de4661ed88a30c99a7a9449aa84174')
     *  .at('0x2791bca1f2de4661ed88a30c99a7a9449aa84174')
     *  .memberId('0x2791bca1f2de4661ed88a30c99a7a9449aa84174')
     *  .then(console.log)
     * @returns {Promise.<object>}
     
    getabi(address) {
      const module = 'contract';
      const action = 'getsourcecode';

      var query = querystring.stringify({
        module, action, address, apiKey
      });

      return getRequest(query);
    }
  };
};*/