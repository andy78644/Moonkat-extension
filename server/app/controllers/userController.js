const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Get the Contract with Specific Address
exports.findOne = (req, res) => {
  const address = req.params.address;
  console.log('Start Getting User Address: ' + address)
  User.findByPk(address)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Cannot find User with address: " + address
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error: " + err + " Error Retrieving User with address: " + address
    });
  });
};