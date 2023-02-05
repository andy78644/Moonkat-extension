const contracts = require("../controllers/contractController.js");
const express = require('express');
const router = express.Router();
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
//router.get("/", contracts.getByAddress);
//router.get("/basic", contracts.getByAddress);
//router.get("/tags", contracts.getByAddress);
//router.get("/transfer", contracts.getByAddress);
router.get("/token", contracts.getTokenInformation);
//router.get("/creater", contracts.getByAddress);
//app.use('/api/contracts', router);
module.exports = router;


