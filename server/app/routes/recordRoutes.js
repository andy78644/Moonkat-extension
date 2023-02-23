const record = require('../controllers/userRecordController')
const express = require('express')
const router = express.Router()


router.post("/", record.sendRecord);
module.exports = router;