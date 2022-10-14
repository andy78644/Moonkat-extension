module.exports = {
    HOST:'127.0.0.1',
    USER: "moonkat@cloudsqlproxy~%",
    PASSWORD: "yang1029",
    DB: "moonkatcloudsql",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        // e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
        // same as host string above
        socketPath: '/cloudsql/moonkat-db'
    },
}