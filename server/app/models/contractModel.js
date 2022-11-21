module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define('Contract', {
        address: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        tokenType: {
            type: Sequelize.STRING
        },
        holders: {
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.FLOAT
        },
        createTime: {
            type: Sequelize.DATE
        },
        lastTransactionTime: {
            type: Sequelize.DATE
        },
        numberOfTransaction: {
            type: Sequelize.INTEGER
        },
        reserveSpotOne: {
            type: Sequelize.STRING
        },
        reserveSpotTwo: {
            type: Sequelize.STRING
        },
        reserveSpotThree: {
            type: Sequelize.STRING
        },
        reserveSpotFour: {
            type: Sequelize.STRING
        },
        reserveSpotFive: {
            type: Sequelize.STRING
        }   
    });
    return Contract;
}