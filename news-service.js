const MicroMQ = require('micromq');
const mysql = require("mysql2");
const env = require("./envinments")
const connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: env.user,
    database: env.database,
    password: env.password
});
const bodyParser = require("body-parser");

const service = new MicroMQ({
    name: 'news',
    rabbit: {
        url: 'amqp://localhost:5672',
    },
});
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: true }));

service.get('/getNews', (req, res) => {
    let groupid = req.query.groupid;

    let querydata = [];
    querydata.push(groupid);

    let sql = 'SELECT * FROM news WHERE ID IN (SELECT New_ID FROM informing WHERE Group_ID IN (?)) ORDER BY datedmy DESC';
    connection.query(sql, querydata, (err, results) => {
        if (err) return console.log(err);
        res.json(results)
    });
});

service.get('/getInforming', (req, res) => {
    let groupid = req.query.groupid;

    let sql = 'SELECT * FROM informing WHERE Group_ID IN (?)';
    connection.query(sql, [groupid], (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    });
});

service.post('/postNew', (req, res) => {
    let groupid = req.query.groupid;
    let querydata = Object.values(req.body);

    let sql1 = 'INSERT INTO news (datedmy, title, body, epilogue, filehash) VALUES (?,?,?,?,?)';
    let sql2 = 'INSERT INTO informing (group_id, new_id) VALUES (?,?)';
    connection.query(sql1, querydata, (err, results) => {
        if (err) return console.log(err);

        let nextquerydata = [groupid, results.insertId];

        connection.query(sql2, nextquerydata, (err, results) => {
            if (err) return console.log(err);
            res.json(results);
        });
    });
});

service.start();