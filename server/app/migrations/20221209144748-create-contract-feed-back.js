'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContractFeedBacks', {
      ReportID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Provider: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ReportedContract: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('ContractFeedBacks');
  }
};