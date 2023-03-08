const record = require('../controllers/userRecordController')
const express = require('express')
const router = express.Router()
const validator = require('./validator.js')


router.post("/info", record.sendRecord);
router.post("/behavior", record.behaviorRecord);
router.post("/simulate", validator.simualtionResult, record.simulationRecord);

module.exports = router;