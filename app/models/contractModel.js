// Define the contract table
module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define("Contract", {
        address: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        createTime: {
            type: Sequelize.STRING
        },
        safe: {
            type: Sequelize.INTEGER
        },
        neutral: {
            type: Sequelize.INTEGER
        },
        danger: {
            type: Sequelize.INTEGER
        },
    });
    return Contract;
}