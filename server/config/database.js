const mysql = require('mysql2');

// Setup a connection pool using the promise-based API
const pool = mysql.createPool({
    connectionLimit: 10, // The maximum number of connections to create at once
    host: 'csc318project.c1s6u6eai311.us-east-1.rds.amazonaws.com',    // Your database host
    user: 'admin',         // Your database username
    password: 'project318',         // Your database password
    database: 'project318', // Your database name
    port: 3306            // Your database port
}).promise();  // Use promise() to get a promise-based interface

// Function to execute SQL queries using the pool with execute method for prepared statements
const execute = async (sql, parameters) => {
    return await pool.execute(sql, parameters);
};

// Function to execute SQL queries using the pool with query method for regular queries
const query = async (sql, parameters) => {
    return await pool.query(sql, parameters);
};

// Export both execute and query functions for use in other parts of your application
module.exports = {
    execute,
    query
};