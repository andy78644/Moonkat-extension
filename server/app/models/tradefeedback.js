'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TradeFeedBack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TradeFeedBack.init({
    ReportID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Provider: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ReportedContract: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CategoryTag: DataTypes.STRING,
    NameTag: DataTypes.STRING,
    FeatureTagOne: DataTypes.STRING,
    FeatureTagTwo: DataTypes.STRING,
    FeatureTagThree: DataTypes.STRING,
    ReportTime: DataTypes.DATE,
    ReserveSpotOne: DataTypes.STRING,
    ReserveSpotTwo: DataTypes.STRING,
    ReserveSpotThree: DataTypes.STRING,
    ReserveSpotFour: DataTypes.STRING,
    ReserveSpotFive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TradeFeedBack',
  });
  return TradeFeedBack;
};