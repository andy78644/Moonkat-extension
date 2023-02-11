const db = require("../models");
const { ContractFeedBack, Contract }= db;
const Op = db.Sequelize.Op;
const querystring = require('querystring');
const getData = require('./getRequest.js');
const contract = require("../models/contract");

const apiKey = 'NE2VP5S89SW4TGJSZPCKZHZN2NZ9XKWY4P'
// Get the Contract with Specific Address
exports.reportFeedback = async (req, res) => {
    const report = {
        Provider: req.body.Provider,
        ReportedContract: req.body.Address,
        CategoryTag: req.body.Category,
        NameTag: req.body.Name,
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

    let ReportedContract = req.body.Address;
    let tagMap = new Map();
    const reportQuery = [
        "Provider",
        "ReportedContract",
        "CategoryTag",
        "NameTag",
        "FeatureTagOne",
        "FeatureTagTwo",
        "FeatureTagThree",
    ];
    let condition = ReportedContract ? { ReportedContract: { [Op.like]: `%${ReportedContract}%` } } : null;
    const contractFeedBacks = await ContractFeedBack.findAll( {where: condition, attributes: reportQuery})
    contractFeedBacks.forEach(
        (contractFeedBack) => {
            if(tagMap.has(contractFeedBack.FeatureTagOne)) tagMap.set(contractFeedBack.FeatureTagOne, tagMap.get(contractFeedBack.FeatureTagOne)+1);
            else  tagMap.set(contractFeedBack.FeatureTagOne, 1);
            if(tagMap.has(contractFeedBack.FeatureTagTwo)) tagMap.set(contractFeedBack.FeatureTagTwo, tagMap.get(contractFeedBack.FeatureTagTwo)+1);
            else  tagMap.set(contractFeedBack.FeatureTagTwo, 1);
            if(tagMap.has(contractFeedBack.FeatureTagThree)) tagMap.set(contractFeedBack.FeatureTagThree, tagMap.get(contractFeedBack.FeatureTagThree)+1);
            else  tagMap.set(contractFeedBack.FeatureTagThree, 1);
        }
    );
    tagMap[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    }
    let featureTag = [null, null, null];
    let count = 0;
    tagMap.forEach(
        (value, tag) => {
            if(count == 3) return;
            featureTag[count] = tag;
            count++;
            
        }
    )
    //console.log(featureTag);
    const updateTag = {
        FeatureTagOne: featureTag[0],
        FeatureTagTwo: featureTag[1],
        FeatureTagThree: featureTag[2]
    };
    const contract = await Contract.findByPk(ReportedContract);
    contract.update(updateTag);

        
  
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





