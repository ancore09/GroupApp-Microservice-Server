const Gateway = require('micromq/gateway');
const express = require('express')

const app = express()

const gateway = new Gateway({
    microservices: ['news', 'lessons'],
    rabbit: {
        url: 'amqp://localhost:5672',
    },
});

app.use(gateway.middleware())

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

app.listen(3000);