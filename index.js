const Gateway = require('micromq/gateway');
const express = require('express')

const app = express()

const gateway = new Gateway({
    microservices: ['news'],
    rabbit: {
        url: 'amqp://localhost:5672',
    },
    requests: {
        timeout: 5000,
    },
});

app.use(gateway.middleware())


app.get('/news', async (req, res) => {
    console.log("get")
    await res.delegate('news');
});

app.listen(3000);