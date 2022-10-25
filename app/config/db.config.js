module.exports = {
    HOST:'127.0.0.1',
    USER: "<DB USER>",
    PASSWORD: "<DB PWD>",
    DB: "<DB NAME>",
    dialect: "mysql",
    PORT: "<PORT>",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}