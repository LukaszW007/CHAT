const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UserService = require('./UserService.js');
const path= require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const userService= new UserService();

// app.use(express.static(__dirname + '../build'));
app.use('/', express.static(path.join(__dirname, '../build')))

/*app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});*/

io.on('connection', function (socket) {
    socket.on('join', function (name) {
        userService.addUser({
            id: socket.id,
            name
        });
        io.emit('update', {                 //czemu io zamiast socket?
            users: userService.getAllUsers()
        })
    })
});
io.on('connection',function (socket) {
    socket.on('disconnect',()=>{
        userService.removeUser(socket.id);
        socket.broadcast.emit('update',{
            users:userService.getAllUsers()
        })
    })
});
io.on('connection',function (socket) {
    socket.on('message',function (message) {
        const {name}=userService.getUserById(socket.id);
        socket.broadcast.emit('message',{
            text:message.text,
            from: name
        })
    })
});

server.listen(3000, function () {
    console.log('listening on *:3000');
});