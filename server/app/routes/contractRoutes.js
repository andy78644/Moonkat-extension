module.exports = app => {
    const contracts = require("../controllers/contractController.js");
    var router = require("express").Router();

    // Find a Contract
    router.get("/:address", contracts.findOne);
    app.use('/api/contracts', router);
  };