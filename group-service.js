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
    name: 'groups',
    rabbit: {
        url: 'amqp://localhost:5672',
    },
});
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: true }));

service.get('/getGroup', (req, res) => {
    let id = req.query.id;

    let sql = 'SELECT * FROM usergroups WHERE ID IN (?)';

    connection.query(sql, [id], (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    });
});

service.get('/getGrouping', (req, res) => {
    let userid = req.query.userid;
    let groupid = req.query.groupid;

    let sql = 'SELECT * FROM usergrouping';
    let querydata = [];

    if (userid != null) {
        sql = 'SELECT * FROM usergrouping WHERE user_id = (?)';
        querydata.push(userid);
    }

    if (groupid != null) {
        sql = 'SELECT * FROM usergrouping WHERE group_id = (?)';
        querydata.push(groupid);
    }

    connection.query(sql, querydata, (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    });
});

service.start();