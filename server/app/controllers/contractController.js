const db = require("../models");
const { Contract }= db;
const Op = db.Sequelize.Op;
const querystring = require('querystring');
const getData = require('./getRequest.js');
const { create } = require("domain");
const Web3 = require('web3');
const { hasUncaughtExceptionCaptureCallback } = require("process");
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
  var resContract = {
    ContractAddress: address,
    balance: null,
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
    resContract.TokenType = contract.TokenType;
    resContract.Holders = contract.Holders;
    resContract.TokenCreateTime = contract.CreateTime;
    resContract.TokenLastTransactionTime = contract.LastTransactionTime;
    resContract.balance = web3.utils.fromWei( contract.Balance.toString(), "ether");
    resContract = JSON.stringify(resContract);
    res.status(200).send(resContract);
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
    await console.log("test");
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
      })
      .catch(err => console.log(err.message));

      api_data.Balance.then( data => {
        //const balance = web3.utils.fromWei( data.result, "ether");;
        set_up_contract.Balance = data.result;
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
  
  
}; 

exports.getTokenInformation = async (req, res) => {
  const address = req.query.address;
  //for test
  //const address = '0x388C818CA8B9251b393131C08a736A67ccB19297'
                  
  //const chainID = req.query.chainID;

  
  const contract = await Contract.findByPk(address);
  // const allcontract = await Contract.findAll();
  // console.log(allcontract)
  var resContract = {
    Balance: null,
    TokenLastTransactionTime: null,
    TokenCreateTime: null,
    TokenType: null,
    Holders: null,
    TokenTransactionCount: null
  }
  var contractData = await query(address);
  console.log(contractData);
  if(contractData.TokenType.length > 10 ) resContract.TokenType = null;
    else resContract.TokenType = contractData.TokenType;
  resContract.Holders = contractData.Holders;
  resContract.TokenCreateTime = contractData.CreateTime;
  resContract.TokenLastTransactionTime = contractData.LastTransactionTime;
  resContract.Balance = web3.utils.fromWei( contractData.Balance.toString(), "ether");
  resContract = JSON.stringify(resContract);
  res.status(200).send(resContract);
  if(contract){
    //resdata = JSON.stringify(contract);
    //console.log(resdata)
    //res.status(200).send(resContract);
  } 
  else{
    /*
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
    */
  }
  
  
}; 

async function query(address){
  var query = null;
  var set_up_contract = {
    Address: address,
    LastTransactionTime: null,
    CreateTime: null,
    TokenType: "",
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
  await console.log("test");
  
  await api
  .then(async api_data=>{
    await api_data.LastTransaction.then(function(data){
      const transactions = data.result;
      const latesttransaction = transactions[0];
      const date = new Date(latesttransaction.timeStamp*1000);
      set_up_contract.LastTransactionTime = date;
      //console.log(date)
    })
    .catch(err => {
      console.log(err);
    });

   
    await api_data.CreateTransaction.then(function(data){
      const transactions = data.result;
      const latesttransaction = transactions[0];
      const date = new Date(latesttransaction.timeStamp*1000);
      set_up_contract.CreateTime = date;
      // console.log(date)
    })
    .catch(err => {
      console.log(err);
    });
    await api_data.TransactionCount.then(function(data){
      const transcount = parseInt(data.result, 16).toString(10);
      set_up_contract.NumberOfTransaction = transcount;
      // console.log(date)
    }).catch(err => {
      console.log(err);
    });

    var tokentype = "";
    await api_data.TokenInfo.then( data => {
      const valid = data.message;
      if (valid == "OK"){
        tokentype = data.result["TokenType"];
      } else{
        tokentype = data.result;
      }
      set_up_contract.TokenType = tokentype;
    })
    .catch(err => {
      console.log(err);
    });

    await api_data.Balance.then( data => {
      //const balance = web3.utils.fromWei( data.result, "ether");;
      data.result = data.result?data.result:0;
      set_up_contract.Balance = data.result;
    })
    .catch(err => {
      console.log(err);
    });
  })
  
  return set_up_contract;
}
