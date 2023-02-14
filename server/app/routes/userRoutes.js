module.exports = app => {
    const user = require("../controllers/userController.js");
    let  router = require("express").Router();

    // Find a User
    router.get("/:address", user.getByAddress);
    
    app.use('/api/users', router);
  };