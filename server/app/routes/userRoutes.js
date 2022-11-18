module.exports = app => {
    const contracts = require("../controllers/userController.js");
    var router = require("express").Router();

    // Find a User
    router.get("/:address", users.findOne);
    
    app.use('/api/users', router);
  };