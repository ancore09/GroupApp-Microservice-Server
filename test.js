const express = require('express')
const node_media_server = require('./media-server');
const app = express()
const mysql = require("mysql2");
const connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'outofstyle'
});

// app.get("/", (req, res) => {
//    let sql = 'SELECT * FROM test'
//
//    connection.query(sql, [], (err, results) => {
//        res.send(results);
//    }) ;
// });

app.listen(3000);
node_media_server.run();