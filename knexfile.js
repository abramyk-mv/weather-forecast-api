require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_USE,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
    },
    test: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_USE_TEST,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
    },
};
