require("dotenv").config();

const {
  DB_STAGING_HOST,
  DB_STAGING_USERNAME,
  DB_STAGING_PASSWORD,
  DB_STAGING_DATABASE,
  DB_PROD_HOST,
  DB_PROD_USERNAME,
  DB_PROD_PASSWORD,
  DB_PROD_DATABASE,
} = process.env;

module.exports = {
  development: {
    username: "postgres",
    password: "dicky2uxgg",
    database: "thrive_development",
    host: "localhost",
    dialect: "postgres",
    timezone: "Asia/Jakarta",
  },
  staging: {
    username: DB_STAGING_USERNAME,
    password: DB_STAGING_PASSWORD,
    database: DB_STAGING_DATABASE,
    host: DB_STAGING_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    timezone: "Asia/Jakarta",
  },
  test: {
    username: "postgres",
    password: "dicky2uxgg",
    database: "thrive_test",
    host: "localhost",
    dialect: "postgres",
    timezone: "Asia/Jakarta",
  },
  production: {
    username: DB_PROD_USERNAME,
    password: DB_PROD_PASSWORD,
    database: DB_PROD_DATABASE,
    host: DB_PROD_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    timezone: "Asia/Jakarta",
  },
};
