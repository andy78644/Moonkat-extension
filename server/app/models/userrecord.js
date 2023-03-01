'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRecord.init({
    TabURL: DataTypes.STRING,
    UserAddress: DataTypes.STRING,
    ContractAddress: DataTypes.STRING,
    Behavior: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserRecord',
  });
  return UserRecord;
};