var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.post('/login', (req, res, next) => {
  if (checkForCredentials(req)) {  // This function checks for credentials passed in the request's payload
    req.session.auth = true
    res.redirect('/messages') // Private resource
  } else {
    res.status(401).send() // Not authorized
  }
})


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
