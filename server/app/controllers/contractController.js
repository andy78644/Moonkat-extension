const db = require("../models");
const { Contract }= db;
const Op = db.Sequelize.Op;
const querystring = require('querystring');
const getData = require('./getRequest.js');
//const db = require("../models");
//const Contract = db.Contract;

apiKey = 'NE2VP5S89SW4TGJSZPCKZHZN2NZ9XKWY4P'
// Get the Contract with Specific Address
exports.getByAddress = async (req, res) => {
  const address = req.query.address;
  //const chainID = req.query.chainID;
  const module = 'account';
  const action = 'balance';
  const tag = 'latest';
  //if()

  const contract = await Contract.findByPk(address)
  if(contract){
    resdata = {
      "Address" : contract.Address,
      "Balance" : contract.Balance
    }
    res.status(200).send(JSON.stringify(resdata));
  } 
  else{
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