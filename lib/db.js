// lib/db.js
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,        // Database server address
  user: process.env.DB_USER,        // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: process.env.DB_NAME,    // Database name
  port: process.env.DB_PORT,        // MySQL port (default 3306)
  waitForConnections: true,         // Wait for available connection
  connectionLimit: 10,              // Maximum number of connections
  queueLimit: 0                     // No limit on queued connection requests
};

// Create connection pool for better performance
const pool = mysql.createPool(dbConfig);

// Export the pool for use in other files
export default pool;