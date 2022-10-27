require("dotenv").config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_STAGING_HOST,
  DB_STAGING_DATABASE,
  DB_STAGING_USERNAME,
  DB_STAGING_PASSWORD,
  DB_PROD_HOST,
  DB_PROD_DATABASE,
  DB_PROD_USERNAME,
  DB_PROD_PASSWORD,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      multipleStatements: true,
    },
  },
  test: {
    username: DB_STAGING_USERNAME,
    password: DB_STAGING_PASSWORD,
    database: DB_STAGING_DATABASE,
    host: DB_STAGING_HOST,
    dialect: "postgres",
    dialectOptions: {
      multipleStatements: true,
    },
  },
  production: {
    username: DB_PROD_USERNAME,
    password: DB_PROD_PASSWORD,
    database: DB_PROD_DATABASE,
    host: DB_PROD_HOST,
    dialect: "postgres",
    dialectOptions: {
      multipleStatements: true,
    },
  },
};
