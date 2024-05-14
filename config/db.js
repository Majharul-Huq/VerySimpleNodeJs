const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
    host : process.env.host,
    user: "root",
    password: "",
    database: "db_node",
});

module.exports = mySqlPool;
