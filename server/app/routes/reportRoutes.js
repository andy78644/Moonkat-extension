const report = require("../controllers/contractFeedBackController");
const express = require('express');
const router = express.Router();
const validator = require('./validator.js')

router.post("/", validator.reportContract, report.reportFeedback);
module.exports = router;