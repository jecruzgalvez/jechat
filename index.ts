import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as socketio from 'socket.io';
import * as cookieParser from 'cookie-parser';
// import * as expressSession from 'express-session';
import * as logger from 'morgan';
import * as errorHandler from 'errorhandler';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator';
import * as methodOverride from 'method-override';
// import * as passport from 'passport';

import * as routes from './src/routes';

mongoose.connect('mongodb://localhost/JEChat');
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  const app = express();
  app.locals.appTitle = 'JEChat';

  // Express.js configurations
  app.set('port', process.env.PORT || 3001);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  // Express.js middleware configuration
  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(expressValidator());
  app.use(methodOverride());
  app.use(require('stylus').middleware(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
  // app.use(expressSession({
  //   secret: '2C44774A-D649-4D44-9535-46E296EF984F',  
  //   resave: true,
  //   saveUninitialized: false
  // }));
  
  // app.use(passport.initialize());
  // app.use(passport.session());

  // Authentication middleware
  // app.use(function(req, res, next) {
  //   if (req.session && req.session.admin)
  //     res.locals.admin = true;
  //   next();
  // });

  // app.use(function (req: express.Request , res: express.Response, next: Function) {
  //   if (req.cookies.auth )
  //     res.locals.authUser = true;
  //   next();
  // })

  // Authorization Middleware
  var auth = function(req: express.Request , res: express.Response, next: Function) {
    // console.log('------Actual cookies --------:\n', req.cookies.auth);
    // if (req.cookies.auth)
      return next();
    // else
      // return res.send(401);
  };

  if ('development' == app.get('env')) {
    app.use(errorHandler());
   }

  // Routes
  app.get('/',                             routes.index);

  app.get('/api/populate',                 routes.populate);

  app.post('/registration',                routes.registration);
  app.get('/api/login',                    routes.login);
  app.get('/api/logout',                   routes.logout);

  app.get('/api/fetchFriends',       auth, routes.fetchFriends);
  app.get('/api/fetchContacts',      auth, routes.fetchContacts);

  app.get('/api/newConversation',    auth, routes.newConversation);
  app.get('/api/fetchConversations', auth, routes.fetchConversations);

  app.get('/api/saveMessage',        auth, routes.saveMessage);
  app.get('/api/fetchMessages',      auth, routes.fetchMessages);

  app.all('*', function (req, res) {
    res.status(404).send();
  });

  const server = http.createServer(app);
  const io = socketio(server);

  io.on('connection', function(socket) {
    // console.log('a user connected');
    
    socket.on('disconnect', function() {
      // console.log('user disconnected');
    });
  
    socket.on('chat message', function(msg) {
      // console.log(msg);
      io.emit('chat message', {response: msg});
    });
    
  });

  const boot = function () {
    server.listen(app.get('port'), function () {
      // console.info(`Express server listening on port ${app.get('port')}`);
    });
  };
  
  const shutdown = function () {
    server.close(process.exit);
  };
  if (require.main === module) {
    boot();
  } else {
    console.info('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
  }
  
});