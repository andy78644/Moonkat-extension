const contracts = require("../controllers/contractController.js");
const express = require('express');
const router = express.Router();
// Find a Contract
router.get("/token", contracts.getTokenInformation);
module.exports = router;


