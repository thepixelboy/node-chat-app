const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

let count = 0;

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.emit('countUpdated', count);
  socket.on('increment', () => {
    count++;
    // socket.emit('countUpdated', count);
    io.emit('countUpdated', count);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
