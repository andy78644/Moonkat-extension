const db = require("../models");
const { Contract }= db;
const Op = db.Sequelize.Op;
const querystring = require('querystring');
const getData = require('./getRequest.js');
const { create } = require("domain");
const Web3 = require('web3');
const { hasUncaughtExceptionCaptureCallback } = require("process");
const web3 = new Web3();
require('dotenv').config()

// etherscan api key
const apiKey = process.env.ETHERSCAN_API_KEY

exports.getTokenInformation = async (req, res) => {
  const address = req.query.address;
  const contract = await Contract.findByPk(address);
  var resContract = {
    Balance: null,
    TokenLastTransactionTime: null,
    TokenCreateTime: null,
    TokenType: null,
    Holders: null,
    TokenTransactionCount: null
  }
  var contractData = await query(address);
  if(contractData.TokenType.length > 10 ) resContract.TokenType = null;
    else resContract.TokenType = contractData.TokenType;
  resContract.Holders = contractData.Holders;
  resContract.TokenCreateTime = contractData.CreateTime;
  resContract.TokenLastTransactionTime = contractData.LastTransactionTime;
  resContract.Balance = web3.utils.fromWei( contractData.Balance.toString(), "ether");
  resContract = JSON.stringify(resContract);
  res.status(200).send(resContract);
  if(contract){
    //todo: update the contract data
  } 
  else{
    //todo: create new contract data
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
  .then(async apiData=>{
    await apiData.LastTransaction.then(function(data){
      const transactions = data.result;
      const lastTransaction = transactions[0];
      const date = new Date(lastTransaction.timeStamp*1000);
      set_up_contract.LastTransactionTime = date;
      //console.log(date)
    })
    .catch(err => {
      console.log(err);
    });
    await apiData.CreateTransaction.then(function(data){
      const transactions = data.result;
      const latestTransaction = transactions[0];
      const date = new Date(latestTransaction.timeStamp*1000);
      set_up_contract.CreateTime = date;
      // console.log(date)
    })
    .catch(err => {
      console.log(err);
    });
    await apiData.TransactionCount.then(function(data){
      const transcount = parseInt(data.result, 16).toString(10);
      set_up_contract.NumberOfTransaction = transcount;
      // console.log(date)
    }).catch(err => {
      console.log(err);
    });

    var tokenType = "";
    await apiData.TokenInfo.then( data => {
      const valid = data.message;
      if (valid == "OK"){
        tokenType = data.result["TokenType"];
      } else{
        tokenType = data.result;
      }
      set_up_contract.TokenType = tokenType;
    })
    .catch(err => {
      console.log(err);
    });

    await apiData.Balance.then( data => {
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
