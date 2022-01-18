const mysql = require('mysql');

const pool = mysql.createPool({
    "user": "root",
    "password": null,
    "database" : "mygames",
    "host": "localhost",
    "port": 3306

});


exports.pool = pool;
