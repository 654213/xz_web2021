const mysql = require("mysql");
//创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'xz',
    connectionLimit: 15
});

module.exports = pool;