const db = require("../models");
const Contract = db.contracts;
const Op = db.Sequelize.Op;
// Get the present contract
exports.findOne = (req, res) => {
  console.log('Start Get contract')
  const address = req.params.address;
  Contract.findByPk(address)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Contract with address= ${address}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error: " + err + " Error retrieving Contract with address= " + address
    });
  });
};