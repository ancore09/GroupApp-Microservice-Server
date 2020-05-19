const Gateway = require('micromq/gateway');
const express = require('express');
const app = express();
const env = require('./envinments');
const bodyParser = require("body-parser");
const gateway = new Gateway({
    microservices: ['news', 'lessons', 'groups-users'],
    rabbit: {
        url: 'amqp://' + env.rabbitip + ':5672',
    },
});

app.use(gateway.middleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//MARK: News

app.get('/getNews', async (req, res) => {
    await res.delegate('news');
});

app.get('/getInforming', async (req, res) => {
    await res.delegate('news');
});

app.post('/postNew', async (req, res) => {
    await res.delegate('news')
})

//MARK: Lessons

app.get('/getLearning', async (req, res) => {
    await res.delegate('lessons')
});

app.post('/postLesson', async (req, res) => {
    await res.delegate('lessons')
});

app.put('/editLesson', async (req, res) => {
    await res.delegate('lessons')
});

app.get('/getUserMarks', async (req, res) => {
    await res.delegate('lessons')
});

app.get('/getMarks', async (req, res) => {
    await res.delegate('lessons')
});

app.post('/putUserMark', async (req, res) => {
    await res.delegate('lessons')
});

app.get('/getEvaluation', async (req, res) => {
    await res.delegate('lessons')
});

app.get('/getLessons', async (req, res) => {
    await res.delegate('lessons')
});

//MARK: Users

app.get('/auth', async (req, res) => {
    await res.delegate('groups-users')
});

app.get('/getMemberData',  async (req, res) => {
    await res.delegate('groups-users')
});

app.post('/regUser',  async (req, res) => {
    await res.delegate('groups-users')
});

app.get("/getUsers",  async (req, res) => {
    await res.delegate('groups-users')
});

app.post('/addUserToGroup',  async (req, res) => {
    await res.delegate('groups-users')
});

//MARK: Groups

app.get('/getGroup',  async (req, res) => {
    await res.delegate('groups-users')
});

app.get('/getGrouping',  async (req, res) => {
    await res.delegate('groups-users')
});

//MARK: Files

app.post('/uploadFile',  async (req, res) => {
    await res.delegate('files')
});

app.post('/upload-photos',  async (req, res) => {
    await res.delegate('files')
});

app.listen(3000);