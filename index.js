"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var path = require("path");
var mongoose = require("mongoose");
var socketio = require("socket.io");
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
    app.use(function (req, res, next) {
        // console.log('---client request cookies header:\n', req.headers['cookie']);
        console.log('---client request cookies headxxxer:\n', req.cookies);
        if (req.cookies.auth)
            res.locals.authUser = true;
        next();
    });
    // Authorization Middleware
    // var authorize = function(req: any, res: any, next: any) {
    //   console.log('qqqqqqqqqqqqqqqqqqqqqq',req.locals)
    //   console.log('cccccccccccccccccccccccccc:\n', req.cookies);
    //   if (req.session.authUser)
    //     return next();
    //   else
    //     return res.send(401);
    // };
    if ('development' == app.get('env')) {
        app.use(errorHandler());
    }
    // Pages and routes
    app.get('/', routes.index);
    // REST API routes 
    app.get('/api/test', routes.api.test);
    app.get('/api/login', routes.api.login);
    app.get('/api/logout', routes.api.logout);
    app.post('/registration', routes.api.registration);
    app.get('/api/populate', routes.api.populate);
    app.get('/api/fetchContacts', routes.api.fetchContacts);
    app.post('/api/newcConversation/:recipient', routes.api.newConversation);
    app.all('*', function (req, res) {
        res.status(404).send();
    });
    var server = http.createServer(app);
    var io = socketio(server);
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('chat message', function (msg) {
            console.log(msg);
            io.emit('chat message', { response: msg });
        });
    });
    var boot = function () {
        server.listen(app.get('port'), function () {
            console.info("Express server listening on port " + app.get('port'));
        });
    };
    var shutdown = function () {
        server.close(process.exit);
    };
    if (require.main === module) {
        boot();
    }
    else {
        console.info('Running app as a module');
        exports.boot = boot;
        exports.shutdown = shutdown;
        exports.port = app.get('port');
    }
});
