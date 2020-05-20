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

const service = new MicroMQ({
    name: 'lessons',
    microservices: ['groups-users'],
    rabbit: {
        url: 'amqp://' + env.rabbitip + ':5672',
    },
});

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

service.post('/addUserToGroup', async (req,res) => {
    let querydata = Object.values(req.body);

    let sql1 = 'INSERT INTO usergrouping(User_ID, Group_ID) VALUES (?,?)';
    let sql2 = 'INSERT INTO evaluating(lesson_ID) SELECT ID FROM lessons WHERE Group_ID = ?';
    let sql3 = 'INSERT INTO learning(User_ID, Evaluation_ID) VALUES (?,?)';
    let sql4 = 'INSERT INTO marks VALUE (null)';
    let sql5 = 'UPDATE evaluating SET Mark_ID = (?) WHERE Lesson_ID = (?)';

    await service.ask('group-users', {
        server: {
            action: 'addUserToGroup',
            meta: {
                userid: querydata[0],
                groupid: querydata[1]
            }
        }
    })

    connection.query(sql2, [querydata[1]], (err, results) => {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        console.log("EVALUATING INSERT");

        let start_id = results.insertId;
        let end_id = results.affectedRows + start_id;

        for (let i = start_id; i < end_id; i++) {
            connection.query(sql3, [querydata[0], i], (err, results) => {
                console.log("LEARNING INSERT");
                if (err) {
                    console.log(err);
                    res.send(err);
                    return;
                }
            });

            connection.query(sql4, [], (err, results) => {
                console.log("MARK INSERT");
                if (err) {
                    console.log(err);
                    res.send(err);
                    return;
                }

                connection.query(sql5, [results.insertId, querydata[2]], (err, results) => {
                    console.log("MARK UPDATE");
                    if (err) {
                        console.log(err);
                        res.send(err);
                        return;
                    }
                });
            });

            if (i + 1 == end_id) {
                res.json(results);
            }
        }
    });
});

service.start();