const MicroMQ = require('micromq');

const app = new MicroMQ({
    name: 'news',
    rabbit: {
        url: 'amqp://localhost:5672',
    },
});

app.get('/news', (req, res) => {
    res.json({
        res: "Hello world!"
    })
});

app.start();