const db = require("../models");
const ContractFeedBacks = db.contractFeedBacks;
const Op = db.Sequelize.Op;
const querystring = require('querystring');
const getData = require('./getRequest.js');
//const db = require("../models");
//const Contract = db.Contract;

apiKey = 'NE2VP5S89SW4TGJSZPCKZHZN2NZ9XKWY4P'
// Get the Contract with Specific Address
exports.reportFeedback = (req, res) => {
    const report = {
        Provider: req.body.Provider,
        ReportedContract: req.body.Address,
        CategoryTag: req.body.Category,
        NameTag: req.body.Name,
        FeatureTagOne: req.body.Tag[0],
        FeatureTagTwo: req.body.Tag[1],
        FeatureTagThree: req.body.Tag[2]
    };
  
    ContractFeedBacks.create(report)
        .then(data => {
            const report = {
                "Provider": data.Provider,
                "Address" : data.ReportedContract,
                "Category" : data.CategoryTag,
                "Name": data.NameTag,
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

exports.getFeedback = (req, res) => {
    var ReportedContract = req.query.address;
    var condition = ReportedContract ? { ReportedContract: { [Op.like]: `%${ReportedContract}%` } } : null;
    const reportQuery = [
        "Provider",
        "ReportedContract",
        "CategoryTag",
        "NameTag",
        "FeatureTagOne",
        "FeatureTagTwo",
        "FeatureTagThree",
    ];
    ContractFeedBacks.findAll( {where: condition, attributes: reportQuery})
    .then(contractFeedBacks => {
        const report = {
            "Address" : contractFeedBacks[0].ReportedContract,
            "Category" : contractFeedBacks[0].CategoryTag,
            "Name": contractFeedBacks[0].NameTag,
            "Tag":[
                contractFeedBacks[0].FeatureTagOne,
                contractFeedBacks[0].FeatureTagTwo,
                contractFeedBacks[0].FeatureTagThree
            ]
        };
        res.status(200).send(
            JSON.stringify(report)
        )
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "error"
        });
    });
        
        
        
};



