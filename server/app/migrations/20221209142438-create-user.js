'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      Address: {
        type: Sequelize.STRING,
        primaryKey: true,
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
    await queryInterface.dropTable('Users');
  }
};