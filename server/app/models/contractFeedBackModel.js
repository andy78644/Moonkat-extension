module.exports = (sequelize, Sequelize) => {
    const ContractFeedBack = sequelize.define('ContractFeedBack', {
        ReportID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Provider: {
            type: Sequelize.STRING
        },
        ReportedContract: {
            type: Sequelize.STRING
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
        ReportTime: {
            type: Sequelize.DATE
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
    return ContractFeedBack;
}