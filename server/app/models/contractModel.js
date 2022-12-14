module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define('Contract', {
        Address: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        TokenType: {
            type: Sequelize.STRING
        },
        Holders: {
            type: Sequelize.STRING
        },
        Balance: {
            type: Sequelize.FLOAT
        },
        CreateTime: {
            type: Sequelize.DATE
        },
        LastTransactionTime: {
            type: Sequelize.DATE
        },
        NumberOfTransaction: {
            type: Sequelize.INTEGER
        },
        CategoryTag: {
            type: Sequelize.STRING
        },
        NameTag: {
            type: Sequelize.STRING
        },
        FeatureTagOne: {
            type: Sequelize.STRING
        },
        FeatureTagTwo: {
            type: Sequelize.STRING
        },
        FeatureTagThree: {
            type: Sequelize.STRING
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
    return Contract;
}