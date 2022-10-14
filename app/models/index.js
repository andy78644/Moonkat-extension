const dbConfig = require('../config/db.config')
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    port: 3306,
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    timestamps: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

  const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contracts = require('./contractModel.js')(sequelize, Sequelize);

module.exports = db;