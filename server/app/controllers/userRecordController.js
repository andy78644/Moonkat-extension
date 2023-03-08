const db = require("../models");
const { validationResult } = require('express-validator');
const { UserRecord } = db;

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
        Behavior: req.body.Behavior
    }
    const recordData = await UserRecord.findByPk(req.body.msgId);
    if(recordData === null) res.status(500).send("update failed");
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

exports.simulationRecord = async (req, res) => {
    const errors = validationResult(req.body.SimulationResult);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let record = {
        SimulationResult: req.body.SimulationResult
    }
    const recordData = await UserRecord.findByPk(req.body.msgId);
    if(recordData === null) res.status(500).send("update failed");
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