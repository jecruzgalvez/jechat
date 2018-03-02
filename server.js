var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

http.listen(4001, function() {
  console.log('listening on *:4001');
});
