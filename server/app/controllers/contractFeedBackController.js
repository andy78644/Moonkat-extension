const db = require("../models");
const { ContractFeedBack, Contract }= db;
const Op = db.Sequelize.Op;
const querystring = require('querystring');
const getData = require('./getRequest.js');
const contract = require("../models/contract");

// Get the Contract with Specific Address
exports.reportFeedback = async (req, res) => {
    const check = detectFunc(req.body);
    if(!check)
        res.status(500).send({
            message:
                err.message || "type error"
        });
    const report = {
        Provider: req.body.Provider,
        ReportedContract: req.body.Address,
        CategoryTag: req.body.Category,
        NameTag: req.body.Name,
        Description: req.body.Description,
        FeatureTagOne: req.body.Tag[0],
        FeatureTagTwo: req.body.Tag[1],
        FeatureTagThree: req.body.Tag[2]
    };
  

    ContractFeedBack.create(report)
    .then(data => {
        const report = {
            "Provider": data.Provider,
            "Address" : data.ReportedContract,
            "Category" : data.CategoryTag,
            "Name": data.NameTag,
            "Description": data.Description,
            "Tag":[
                data.FeatureTagOne,
                data.FeatureTagTwo,
                data.FeatureTagThree
            ]
        };
        res.status(201).send(report)
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Create failed"
        });
    })
}; 

exports.getFeedback = async (req, res) => {
    let reportedContract = req.query.address;
    const contract = await Contract.findByPk(reportedContract);
    if(contract){
        const report = {
            "Address" : contract.ReportedContract,
            "Category" : contract.CategoryTag,
            "Name": contract.NameTag,
            "Tag":[
                contract.FeatureTagOne,
                contract.FeatureTagTwo,
                contract.FeatureTagThree
            ]
        };
        res.status(200).send(
            JSON.stringify(report)
        )
    }
    else {
        res.status(500);
    }
    
        
        
        
};

function detectFunc(reqBody){

    return true;
}





