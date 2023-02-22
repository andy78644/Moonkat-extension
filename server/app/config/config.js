require('dotenv').config(); 
module.exports = {
    development: {
      username: JSON.parse(process.env.DB_CONFIG).username,
      password: JSON.parse(process.env.DB_CONFIG).password,
      database: JSON.parse(process.env.DB_CONFIG).database,
      host: "127.0.0.1",
      dialect: 'mysql',
      logging: false,
    },
    test: {
      username: JSON.parse(process.env.DB_CONFIG).username,
      password: JSON.parse(process.env.DB_CONFIG).password,
      database: JSON.parse(process.env.DB_CONFIG).database,
      host: "127.0.0.1",
      dialect: 'mysql',
      logging: false,
    },
    production: {
      username: JSON.parse(process.env.DB_CONFIG).username,
      password: JSON.parse(process.env.DB_CONFIG).password,
      database: JSON.parse(process.env.DB_CONFIG).database,
      host: "127.0.0.1",
      dialect: 'mysql',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  };