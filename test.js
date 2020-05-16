const express = require('express')
const app = express()
const mysql = require("mysql2");
const connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'outofstyle'
});

app.get("/", (req, res) => {
   let sql = 'SELECT * FROM test'

   connection.query(sql, [], (err, results) => {
       res.send(results);
   }) ;
});

app.listen(3000);