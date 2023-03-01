const db = require("../models");
const { UserRecord } = db;
const Op = db.Sequelize.Op;

exports.sendRecord = async (req, res) => {
    UserRecord.create(req.body)
    .then(()=>{
        res.status(201).send()
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Create failed"
        });
    })
}


exports.behaviorRecord = async (req, res) => {
    let record = {
        TabURL: req.body.TabURL,
        UserAddress: req.body.UserAddress,
        ContractAddress: req.body.ContractAddress,
        Behavior: req.body.Behavior
    }
    UserRecord.create(record)
    .then(()=>{
        res.status(201).send("Success")
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Create failed"
        });
    })
}