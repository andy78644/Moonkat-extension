const net = require("net");
const simulator = require("../controllers/transactionSimulationController");
const express = require('express');
const router = express.Router();

router.post("/", simulator.sendTransaction);
router.post("/bn", simulator.sendBlockNativeTransaction)
module.exports = router;
