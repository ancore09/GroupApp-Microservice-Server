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
//const bodyParser = require("body-parser");

const service = new MicroMQ({
    name: 'lessons',
    microservices: ['groups-users'],
    rabbit: {
        url: 'amqp://' + env.rabbitip + ':5672',
    },
});
//service.use(bodyParser.json());
//service.use(bodyParser.urlencoded({ extended: true }));

service.get('/getLearning', (req, res) => {
    let loginid = req.query.loginid;

    let querydata = [];
    querydata.push(loginid);

    let sql = 'SELECT * FROM learning WHERE User_ID = (?)';
    connection.query(sql, querydata, (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    });
});

service.post('/postLesson', async (req, res) => {
    let querydata = Object.values(req.body);

    let count = await service.ask('groups-users', {
        server: {
            action: 'getUsers',
            meta: {
                id: querydata[0]
            }
        }
    });
    let ids = []
    for (let i = 0; i < count.response.length; i++) {
        ids.push(count.response[i].user_id)
    }

    //res.json(count)

    let sql1 = 'INSERT INTO lessons (group_id, datedmy, theme, homework, profcomment, times) VALUES(?,?,?,?,?,?)';
    //let sql2 = 'SELECT COUNT(*) AS c FROM usergrouping WHERE group_id = (?)'
    let sql3 = 'INSERT INTO evaluating (lesson_id) VALUES (?)';
    let sql4 = 'INSERT INTO learning (user_id) VALUES (?)';
    let sql5 = 'UPDATE learning SET evaluation_id = (?) WHERE ID IN (?)'

    connection.query(sql1, querydata, (err, results1) => {
        if (err) return console.log(err);
        console.log("LESSON INSERT")

        connection.query(sql4, [ids], (err, results4) => {
            if (err) return console.log(err);
            console.log("LEARNING INSERT")

            for (let i = 0; i < count.response.length; i++) {
                connection.query(sql3, [results1.insertId], (err, results3) => {
                    if (err) return console.log(err);
                    console.log("EVALUATING INSERT")

                    for (let j = 0; j < results4.affectedRows; j++) {
                        connection.query(sql5, [results3.insertId, results4.insertId + j], (err, results5) => {
                            if (err) return console.log(err);
                            console.log("LEARNING UPDATE")
                            //res.send(results5)
                        });
                    }
                    res.json({
                        ok: true
                    });
                });
            }
        });
    });
});

service.put('/editLesson', (req, res) => {
    let type = req.query.type;

    let sql = '';

    if (type == 1) {
        sql = 'UPDATE lessons SET theme = (?) WHERE id = (?)'
    } else if (type == 2) {
        sql = 'UPDATE lessons SET homework = (?) WHERE id = (?)'
    }

    connection.query(sql, Object.values(req.body), (err, results) => {
        if (err) return console.log(err);
        res.json(results)
    });
});


service.get('/getUserMarks', (req, res) => {
    let loginid = req.query.loginid;
    let lesson_IDs = req.query.lessonsids;
    console.log(lesson_IDs);

    let querydata = [];
    querydata.push(loginid);
    querydata.push(lesson_IDs);

    let sql = 'SELECT * FROM marks WHERE ID IN ' +
        '(SELECT Mark_ID FROM evaluating WHERE ID IN ' +
        '(SELECT Evaluation_ID FROM learning WHERE User_ID = (?)) AND Lesson_ID IN (?))';
    connection.query(sql, querydata, (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    });
});

service.get('/getMarks', (req, res) => {
    let loginid = req.query.loginid;
    let groupid = req.query.groupid;

    let sql = 'SELECT * FROM marks WHERE ID IN' +
        '(SELECT mark_id FROM evaluating WHERE ID IN' +
        '(SELECT evaluation_id FROM learning WHERE user_id = (?)' +
        'AND lesson_id IN ' +
        '(SELECT ID FROM lessons WHERE group_id = (?))) ORDER BY ID DESC';

    connection.query(sql, [loginid, groupid], (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    });
});

service.post('/putUserMark', (req, res) => {
    let querydata = Object.values(req.body);

    let sql = 'INSERT INTO marks (mark) VALUES(?)';
    connection.query(sql, querydata, (err, results) => {
        if (err) return console.log(err);
        console.log(results);
        res.json(results);
    });
});

service.get('/getEvaluation', (req, res) => {
    let loginid = req.query.loginid;

    let querydata = [];
    querydata.push(loginid);

    let sql = 'SELECT * FROM evaluating WHERE ID IN (SELECT Evaluation_ID FROM learning WHERE User_ID = (?))';
    connection.query(sql, querydata, (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    });
});


service.get('/getLessons', (req, res) => {
    let loginid = req.query.loginid;
    let groupid = req.query.groupid;

    let querydata = [];
    querydata.push(loginid);
    querydata.push(groupid);

    let sql = 'SELECT * FROM lessons WHERE ID IN (SELECT Lesson_ID FROM evaluating WHERE ID IN (SELECT Evaluation_ID FROM learning WHERE User_ID = (?))) AND Group_ID IN (?) ORDER BY datedmy DESC';
    connection.query(sql, querydata, (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    });
});

service.start();