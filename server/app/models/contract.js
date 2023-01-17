'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contract.init({
    Address: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    ReportScore: DataTypes.INTEGER,
    TokenType: DataTypes.STRING,
    Holders: DataTypes.STRING,
    Balance: DataTypes.FLOAT,
    CreateTime: DataTypes.DATE,
    LastTransactionTime: DataTypes.DATE,
    NumberOfTransaction: DataTypes.INTEGER,
    CategoryTag: DataTypes.STRING,
    NameTag: DataTypes.STRING,
    FeatureTagOne: DataTypes.STRING,
    FeatureTagTwo: DataTypes.STRING,
    FeatureTagThree: DataTypes.STRING,
    ReserveSpotOne: DataTypes.STRING,
    ReserveSpotTwo: DataTypes.STRING,
    ReserveSpotThree: DataTypes.STRING,
    ReserveSpotFour: DataTypes.STRING,
    ReserveSpotFive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};