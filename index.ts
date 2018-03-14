import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as socketio from 'socket.io';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as logger from 'morgan';
import * as errorHandler from 'errorhandler';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as validator from 'express-validator';
import * as methodOverride from 'method-override';

// FOR UNIVERSAL JAVASCRIPT
// import * as React from 'react';
// import * as ReactDOMServer from 'react-dom/server';
// import HeaderComponent from './src/components/Header';
// import LoginComponent from './src/components/Login';
// import FooterComponent from './src/components/Footer';
// const Header = React.createFactory(HeaderComponent);
// const Login = React.createFactory(LoginComponent);
// const Footer = React.createFactory(FooterComponent);

// Importing the user database scheema
import { User } from './src/models/user';
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
  app.use(validator());
  app.use(methodOverride());
  app.use(require('stylus').middleware(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
  app.use(session({secret: '2C44774A-D649-4D44-9535-46E296EF984F',
    resave: true,
    saveUninitialized: true}));

  // Authentication middleware
  // app.use((req, res, next) => {
  //   if (req.session && req.session.admin) { 
  //     res.locals.admin = true;
  //   }
  //   next();
  // })

  // Authorization Middleware
  // const authorize = function (req:any, res:any, next:any) {
  //   if (req.session && req.session.admin)
  //     return next();
  //   else
  //     return res.status(401).send();
  // }

  if (app.get('env') === 'development') {
    app.use(errorHandler());
  }

  // PAGES&ROUTES
  
  // FOR UNIVERSAL JAVASCRIPT
  // app.get('/login', (req, res, next) => { 
  //     res.render('index', {
  //       header: ReactDOMServer.renderToString(Header()),
  //       login:  ReactDOMServer.renderToString(Login()),
  //       footer: ReactDOMServer.renderToString(Footer())        
  //     });
  // })
  
  app.post('/login', (req, res) => {
    User.find(
      { 'email': req.body.email, 'password': req.body.password },
      ( err, existingUser ) => {
        // console.log(err, existingUser);
        if ( err ) {
          res.status(500).send();
        }
        if ( existingUser.toString () === '' ) {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ response: 'fail' }, null, 3));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ response: 'success', user: existingUser }, null, 3));
        }
      }
    );
  });

  app.post('/registration', (req, res) => {
    User.find(
      { 'email' : req.body.email },
      ( err, existingEmail ) => {
        console.log(err, existingEmail);
        if ( err ) {
          res.status(500).send();
        }
        if ( existingEmail.toString() === '' ) {
          User.insertMany(req.body);
          console.log(req.body);
          console.log('User registration successfull');
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ response: 'success', existingEmail: false }, null, 3));
        } else {
          console.log('The user already exist, impossible to register');
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ response: 'fail', existingEmail: true }, null, 3));
        }
      }
    );
  });

  app.all('*', function (req, res) {
    res.status(404).send();
  });

  const server = http.createServer(app);
  const io = socketio(server);

  io.on('connection', function(socket) {
    console.log('a user connected');
    
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  
    socket.on('chat message', function(msg) {
      console.log(msg);
      io.emit('chat message', {response: msg});
    });
    
  });

  const boot = function () {
    server.listen(app.get('port'), function () {
      console.info(`Express server listening on port ${app.get('port')}`);
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