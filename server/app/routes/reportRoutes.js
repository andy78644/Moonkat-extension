const report = require("../controllers/contractFeedBackController");
const express = require('express');
const router = express.Router();
const validator = require('./validator.js')
//const db = require("../models");
//const user = db.;
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// Find a Contract
/*
router.get("/", (req, res) => {
  res.send('Hello from A!')
});
*/
//router.get("/", report.getFeedback);
router.post("/", validator.reportContract, report.reportFeedback);
//app.use('/api/contracts', router);
module.exports = router;