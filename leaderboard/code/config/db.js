
const knex = require('knex');

// Configure database connection (reuse settings from login-register microservice)
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: '../../../login-register-microservice/code/login_register.db',
    },
    useNullAsDefault: true,
});

module.exports = db;
