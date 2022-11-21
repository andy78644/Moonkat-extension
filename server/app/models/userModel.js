module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        address: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        userName: {
            type: Sequelize.STRING
        },
        reportScore: {
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
    return User;
}