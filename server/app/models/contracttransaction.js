'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContractTransaction.init({
    ContractAddress: DataTypes.STRING,
    CounterParty: DataTypes.INTEGER,
    Date: DataTypes.INTEGER,
    Type: DataTypes.STRING,
    PNL: DataTypes.FLOAT,
    ReserveSpotOne: DataTypes.STRING,
    ReserveSpotTwo: DataTypes.STRING,
    ReserveSpotThree: DataTypes.STRING,
    ReserveSpotFour: DataTypes.STRING,
    ReserveSpotFive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContractTransaction',
  });
  return ContractTransaction;
};