import mysql from 'mysql2/promise';



const dbConfig = {
    host : process.env.local.DB_HOST,
    user : process.env.local.DB_USER,
    password : process.env.local.DB_PASSWORD,
    database : process.env.local.DB_NAME,
    port : process.env.local.DB_PORT,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
};

const pool = mysql.createPool(dbConfig);

export default pool;