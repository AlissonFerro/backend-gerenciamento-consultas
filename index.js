const express = require('express');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors({
    origin: '*'
}));
 
require('./startup/db')();
require('./startup/routes')(app);

const port = 8000;
 
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const socketio = new Server(server, {
    cors: {
        origin: '*'
    }
});
socketio.on('connection', (socket) => {
    console.log('teste');
    socket.on('disconnect', () => {
        console.log('usuario desconectado')
    });
    socket.on('message', (message) => {
        socket.broadcast.emit('message', message);
    })
})
module.exports = socketio;