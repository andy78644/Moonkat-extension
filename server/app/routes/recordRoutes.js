const record = require('../controllers/userRecordController')
const express = require('express')
const router = express.Router()


router.post("/", record.sendRecord);
router.post("/behavior", record.behaviorRecord);
module.exports = router;