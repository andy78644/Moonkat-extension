'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserTransactions', {
      TxID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserTransactions');
  }
};