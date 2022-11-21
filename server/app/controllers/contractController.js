const db = require("../models");
const Contract = db.contracts;
const Op = db.Sequelize.Op;

// Get the Contract with Specific Address
exports.findOne = (req, res) => {
  const address = req.params.address;
  console.log('Start Getting Contract Address: ' + address)
  Contract.findByPk(address)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Cannot find Contract with address: " + address
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error: " + err + " Error Retrieving Contract with address: " + address
    });
  });
};