module.exports = (sequelize, Sequelize) => {
    const ContractTransaction = sequelize.define('ContractTransaction', {
        TxID: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        ContractAddress: {
            type: Sequelize.STRING
        },
        CounterParty: {
            type: Sequelize.INTEGER
        },
        Date: {
            type: Sequelize.INTEGER
        },
        Type: {
            type: Sequelize.STRING
        },
        PNL: {
            type: Sequelize.FLOAT
        },
        ReserveSpotOne: {
            type: Sequelize.STRING
        },
        ReserveSpotTwo: {
            type: Sequelize.STRING
        },
        ReserveSpotThree: {
            type: Sequelize.STRING
        },
        ReserveSpotFour: {
            type: Sequelize.STRING
        },
        ReserveSpotFive: {
            type: Sequelize.STRING
        }
    });
    return ContractTransaction;
}