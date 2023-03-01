'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'UserRecords',
        'ContractAddress',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'UserRecords',
        'Behavior',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'UserRecords',
        'SimulationResult',
        {
          type: Sequelize.DataTypes.JSON,
        },
        { transaction }
      );
      await queryInterface.renameColumn(
        'UserRecords',
        'id',
        'msgId',
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
    try {
      await queryInterface.removeColumn('UserRecords', 'ContractAddress', { transaction });
      await queryInterface.removeColumn('UserRecords', 'Behavior', { transaction });
      await queryInterface.removeColumn('UserRecords', 'SimulationResult', { transaction });
      await queryInterface.renameColumn('UserRecords', 'msgId', 'id', { transaction });
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
