const { body } = require('express-validator');

exports.reportContract = [
    body('Provider').notEmpty().isEthereumAddress().escape(),
    body('Address').notEmpty().isEthereumAddress().escape(),
    body('Category').notEmpty().escape().isString(),
    body('Name').notEmpty().escape().isString(),
    body('Tag').notEmpty(),
    body('Tag[0]').notEmpty().escape().isString(),
    body('Tag[1]').escape().isString(),
    body('Tag[2]').escape().isString(),
    body('Description').notEmpty().escape().isString()
];

exports.simualtionResult = [
    body('changeType').notEmpty().escape(),
    body('gas').notEmpty().escape(),
    body('in').escape(),
    body('out').escape(),
    body('approve').escape()
]
