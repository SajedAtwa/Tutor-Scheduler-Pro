// server/config/database.js
const mysql = require("mysql2");

const required = (key) => {
  if (!process.env[key]) throw new Error(`Missing env var: ${key}`);
  return process.env[key];
};

const pool = mysql
  .createPool({
    host: required("DB_HOST"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_NAME"),
    port: Number(process.env.DB_PORT || 3306),

    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
    queueLimit: 0,

    // If your DB requires SSL (common for hosted DBs), turn this on:
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: true } : undefined,
  })
  .promise();

const execute = async (sql, parameters) => {
  return await pool.execute(sql, parameters);
};

const query = async (sql, parameters) => {
  return await pool.query(sql, parameters);
};

module.exports = {
  execute,
  query,
};