/*const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nama DB
  process.env.DB_USER,     // User postgres
  process.env.DB_PASS,     // Password postgres
  {
    host: process.env.DB_HOST || "login_access",
    dialect: "postgres",
    port: process.env.DB_PORT || 5433,
    logging: false,
  }
);

module.exports = sequelize; */

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;

