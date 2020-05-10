const Gateway = require('micromq/gateway');
const express = require('express')

const app = express()

const gateway = new Gateway({
    microservices: ['news', 'lessons'],
    rabbit: {
        url: 'amqp://localhost:5672',
    },
    requests: {
        timeout: 5000,
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

app.post('/postLesson', (req, res) => {

});

app.put('/editLesson', (req, res) => {

});


app.get('/getUserMarks', (req, res) => {

});

app.get('/getMarks', (req, res) => {

});

app.post('/putUserMark', (req, res) => {

});

app.get('/getEvaluation', (req, res) => {

});


app.get('/getLessons', (req, res) => {

});

app.listen(3000);