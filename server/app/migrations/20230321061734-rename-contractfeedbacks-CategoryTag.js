'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.removeColumn(
        'ContractFeedBacks',
        'CategoryTag',
        { transaction }
      );
      await queryInterface.addColumn(
        'ContractFeedBacks',
        'isMalicious',
        {
          type: Sequelize.DataTypes.BOOLEAN,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.addColumn(
        'ContractFeedBacks',
        'CategoryTag',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.removeColumn(
        'ContractFeedBacks',
        'isMalicious',
        { transaction }
      )
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
