const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "mysql"
});

module.exports = db;