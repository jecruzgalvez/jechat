"use strict";
/// <reference path="node.d.ts">
exports.__esModule = true;
var express = require("express");
var http = require("http");
var path = require("path");
var mongoose = require("mongoose");
var socketIO = require("socket.io");
var cookieParser = require("cookie-parser");
// import * as expressSession from 'express-session';
var logger = require("morgan");
var errorHandler = require("errorhandler");
var compression = require("compression");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var methodOverride = require("method-override");
// import * as passport from 'passport';
var routes = require("./src/routes");
mongoose.connect('mongodb://localhost/JEChat');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var app = express();
    app.locals.appTitle = 'JEChat';
    // Express.js configurations
    app.set('port', process.env.PORT || 3001);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    // Express.js middleware configuration
    app.use(compression());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
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
    var auth = function (req, res, next) {
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
    app.get('/', routes.index);
    app.get('/api/populate', routes.populate);
    app.get('/api/registration', routes.registration);
    app.get('/api/login', routes.login);
    app.get('/api/logout', routes.logout);
    app.get('/api/fetchUsers', auth, routes.fetchUsers);
    app.get('/api/fetchFriends', auth, routes.fetchFriends);
    app.get('/api/newFriend', auth, routes.newFriend);
    app.get('/api/newConversation', auth, routes.newConversation);
    app.get('/api/fetchConversations', auth, routes.fetchConversations);
    app.get('/api/saveMessage', auth, routes.saveMessage);
    app.get('/api/fetchMessages', auth, routes.fetchMessages);
    app.all('*', function (req, res, next) {
        res.status(404).send();
    });
    var server = http.createServer(app);
    // Creating our socket using the instance of the server
    var io = socketIO(server);
    // Set socket.io listeners.
    io.on('connection', function (socket) {
        // console.log('a user connected');
        // On conversation entry, join broadcast channel
        socket.on('enter conversation', function (conversation) {
            socket.join(conversation);
            // console.log('joined ' + conversation);
        });
        socket.on('leave conversation', function (conversation) {
            socket.leave(conversation);
            // console.log('left ' + conversation);
        });
        socket.on('new message', function (conversationId, message) {
            // console.log('qqqqqqq', conversationId, message);
            io.emit('new message', message);
            // io.sockets.in(conversation).emit('refresh messages', conversation);
        });
        socket.on('disconnect', function () {
            // console.log('user disconnected');
        });
    });
    // io.on('connection', function(socket) {
    //   // console.log('a user connected');
    //   socket.on('disconnect', function() {
    //     // console.log('user disconnected');
    //   });
    //   socket.on('chat message', function(msg) {
    //     // console.log(msg);
    //     io.emit('chat message', {response: msg});
    //   });
    // });
    var boot = function () {
        server.listen(app.get('port'), function () {
            // console.info(`Express server listening on port ${app.get('port')}`);
        });
    };
    var shutdown = function () {
        server.close(process.exit);
    };
    if (require.main === module) {
        boot();
    }
    else {
        // console.info('Running app as a module');
        exports.boot = boot;
        exports.shutdown = shutdown;
        exports.port = app.get('port');
    }
});
