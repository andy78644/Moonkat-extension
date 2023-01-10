const net = require("net");
const simulator = require("../controllers/transactionSimulationController");
const express = require('express');
const router = express.Router();

router.post("/", simulator.sendTransaction);
module.exports = router;
