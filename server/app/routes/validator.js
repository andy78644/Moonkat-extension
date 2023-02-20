const { body } = require('express-validator');

exports.reportContract = [
    body('Provider').notEmpty()
];
