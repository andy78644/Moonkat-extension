const db = require("../models");
const { ContractFeedBack, Contract }= db;
const { validationResult } = require('express-validator');
require('dotenv').config(); 


// Get the Contract with Specific Address
exports.reportFeedback = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const report = {
        Provider: req.body.Provider,
        ReportedContract: req.body.Address,
        isMalicious: req.body.isMalicious,
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
            "isMalicious" : data.isMalicious,
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
            "isMalicous" : contract.isMalicous,
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
}





