const db = require("../models");
const { UserRecord } = db;
const Op = db.Sequelize.Op;

exports.sendRecord = async (req, res) => {
    console.log(req.body)
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
        Behavior: req.body.Behavior
    }
    const recordData = await UserRecord.findByPk(req.body.msgId);
    if(recordData == null) res.status(500).send("update failed");
    recordData.update(record)
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