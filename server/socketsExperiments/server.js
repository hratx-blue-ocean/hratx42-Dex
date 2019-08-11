const WebSocket = require('ws');
const http = require('http');
const path = require('path')

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use('/', express.static(path.join(__dirname, 'public')));

 // const dynamicTableSpace = io.of(/\/table\/\d+$/)
const tableSpace = io.of('/table/')
tableSpace.on('connection', (socket) => {
  console.log('connected');

  // broadcast to all clients in the given sub-namespace
  tableSpace.emit('update', 'hello');
  socket.on('room', function(room) {
    socket.join(room);
  });
  socket.on('post', data => console.log(data))
});

server.listen(5000, (err) => {
  if (err) console.error(err);
  else console.log('listening on 5000');
});

// const server=http.createServer(app);
// const webPort = 5000;

// server.listen(webPort, function(){
//  console.log('Web server start. http://localhost:' + webPort );
// });
