module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        Address: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        UserName: {
            type: Sequelize.STRING
        },
        ReportScore: {
            type: Sequelize.INTEGER
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
    return User;
}