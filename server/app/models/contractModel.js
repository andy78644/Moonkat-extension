module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define("Contract", {
        address: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        tokentype: {
            type: Sequelize.STRING
        },
        holders: {
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.FLOAT
        },
        createTime: {
            type: Sequelize.STRING
        }
    });
    return Contract;
}