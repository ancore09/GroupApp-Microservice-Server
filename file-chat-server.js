const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const cors = require('cors');
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(fileUpload());
app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//MARK: Files

app.post('/uploadFile', async (req, res) => {
    try {
        if(!req.files) {
            console.log("NO FILE")
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            console.log(req.files);
            let file = req.files.file;

            let extension = [];

            for (let i = file.name.toString().length; i >= 0; i--) {
                extension.unshift(file.name.toString()[i]);
                if (file.name.toString()[i] == '.') {
                    break;
                }
            }

            file.mv('./uploads/' + file.md5 + extension.join(''));

            res.json({name: file.md5 + extension.join('')});
        }
    } catch (err) {
        res.json({
            error: err
        })
    }
});

app.post('/upload-photos', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = [];

            _.forEach(_.keysIn(req.files.files), (key) => {
                let file = req.files.files[key];
                let extension = [];

                for (let i = file.name.toString().length; i >= 0; i--) {
                    extension.unshift(file.name.toString()[i]);
                    if (file.name.toString()[i] == '.') {
                        break;
                    }
                }

                file.mv('./uploads/' + file.md5 + extension.join(''));

                data.push({
                    name: file.md5 + extension.join(''),
                    mimetype: file.mimetype,
                    size: file.size
                });
            });

            res.json({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

//MARK: Chat

let Messages1 = [];
let Messages2 = [];

app.get('/getMessages', (req, res) => {
    let room = req.query.room

    if (room == 'SamsungITSchool') {
        res.send(JSON.stringify(Messages1));
    } else if (room == 'BiologyClub') {
        res.send(JSON.stringify(Messages2));
    }
});

io.use((socket, next) => {
    let room = socket.handshake.query.room;
    return next();
});

io.on('connection', function(socket) {
    let room = socket.handshake.query.room;
    console.log(room);
    socket.join(room);
    console.log("connected");

    socket.on('message', function(message) {
        console.log(message);
        io.to(message.room).emit('message', message.mes);
        console.log(message.room);
        console.log(message.mes);
        if (message.room == 'SamsungITSchool') {
            Messages1.push(JSON.parse(message.mes));
        } else if (message.room == 'BiologyClub') {
            Messages2.push(JSON.parse(message.mes));
        }
    });

    socket.on('clients', function(data) {
        console.log(data.room)
        console.log(io.sockets.adapter.rooms[data.room])
        socket.emit('clients', io.sockets.adapter.rooms[data.room])
    })

    socket.on('disconnect', function() {
        console.log("disconnected");
        socket.leave(room);
    });

    socket.on('leave', function () {
        socket.leave(room);
    });

    socket.on('changeRoom', function (obj) {
        console.log(obj);
        socket.leave(obj.prev_id);
        socket.join(obj.new_id);
        socket.username = obj.nick
    });
});


http.listen(3001, function(){
    console.log('listening on localhost:' + 3001);
});