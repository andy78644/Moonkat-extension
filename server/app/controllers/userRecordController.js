const db = require("../models");
const { UserRecords }= db;
const Op = db.Sequelize.Op;

exports.sendRecord = async (req, res) => {
    const record = {
        UserAddress: 'TestAddress',
        TabURL: 'TestURL'
    }
    UserRecords.create(record)
    .then(console.log('Recorded!'))
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Create failed"
        });
    })
}