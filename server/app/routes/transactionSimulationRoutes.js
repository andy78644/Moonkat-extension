const simulator = require("../controllers/transactionSimulationController");
const express = require('express');
const router = express.Router();

router.post("/", simulator.sendTransaction);
router.post("/signature", simulator.signatureParsing);
module.exports = router;
