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
        Category: req.body.Category,
        Nametag: req.body.Nametag,
        FeatureTagOne: req.body.Tag[0],
        FeatureTagTwo: req.body.Tag[1],
        FeatureTagThree: req.body.Tag[2]
    };
  
    ContractFeedBacks.create(report)
        .then(data => {
          res.send(data)
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
    const report = [
        "Provider",
        "ReportedContract",
        "CategoryTag",
        "Nametag",
        "FeatureTagOne",
        "FeatureTagTwo",
        "FeatureTagThree",
    ];
    ContractFeedBacks.findAll( {where: condition, attributes: report})
    .then(contractFeedBacks => {
        console.log(contractFeedBacks[0])
        contractFeedBacks = JSON.stringify(contractFeedBacks[0]);
        console.log(contractFeedBacks)
        res.status(201).send(
            contractFeedBacks
        )
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "error"
        });
    });
        
        
        
};

