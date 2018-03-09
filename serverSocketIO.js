var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketio(server);

// var cookieParser = require('cookie-parser');
// var session = require('express-session');

io.on('connection', function(socket) {
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
    console.log(msg);
    io.emit('chat message', {response: msg});
  });
  
});

server.listen(4001, function() {
  console.log('listening on *:4001');
});
