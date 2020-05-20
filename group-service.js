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
    name: 'groups-users',
    rabbit: {
        url: 'amqp://' + env.rabbitip + ':5672',
    },
});
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: true }));

//MARK: users

service.get('/auth', (req, res) => {
    let login = req.query.login;
    let passhash = req.query.passwordhash;

    let sql = 'SELECT * FROM users WHERE login = (?) and passwordhash = (?)';

    connection.query(sql, [login, passhash], (err, results) => {
        if (err) return console.log(err);
        res.json(results[0]);
    });
});

service.get('/getMemberData', (req, res) => {
    let id = req.query.id;

    let sql = 'SELECT * FROM membersdata WHERE ID = (?)';

    connection.query(sql, [id], (err, results) => {
        if (err) return console.log(err);
        res.json(results[0]);
    });
});

service.post('/regUser', (req, res) => {
    let querydata = Object.values(req.body);

    let sql = 'INSERT INTO users (login, passwordhash, firstname, lastname, nickname) VALUES (?,?,?,?,?)';

    connection.query(sql, querydata, (err, results) => {
        if (err) return console.log(err);
        console.log(results);
        res.json(results);
    });
});

service.get("/getUsers", (req, res) => {
    let groupid = req.query.groupid;

    let sql = 'SELECT * FROM users WHERE ID IN (SELECT user_id FROM usergrouping WHERE group_id = (?))'
    connection.query(sql, [groupid], (err, results) => {
        if (err) return console.log(err);
        console.log(results);
        res.json(results);
    })
});

service.action('addUserToGroup', async (meta, res) => {
    let sql = 'INSERT INTO usergrouping(User_ID, Group_ID) VALUES (?,?)';

    connection.query(sql, [meta.userid, meta.groupid], (err, results) => {
        if (err) return console.log(err);

        res.json(results);
    });
})

service.action('getUsers', async (meta, res) => {
    let sql = 'SELECT user_id FROM usergrouping WHERE group_id = (?)'

    connection.query(sql, [meta.id], (err, results) => {
        if (err) return console.log(err);

        res.json(results);
    });
});

//MARK: groups

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