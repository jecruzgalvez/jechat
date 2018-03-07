"use strict";
// require('babel-register')({
//   presets: [ 'react' ]
// })
exports.__esModule = true;
var express = require("express");
// import * as routes from './routes'
var http = require("http");
var path = require("path");
// import * as  mongoskin from 'mongoskin'
// const dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog'
// const db = mongoskin.db(dbUrl)
// const collections = {
//   articles: db.collection('articles'),
//   users: db.collection('users')
// }
// import * as cookieParser from 'cookie-parser'
// import * as session from 'express-session'
var logger = require("morgan");
var errorHandler = require("errorhandler");
var compression = require("compression");
var bodyParser = require("body-parser");
var validator = require("express-validator");
var methodOverride = require("method-override");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var Login_1 = require("./src/components/Login");
var About = React.createFactory(Login_1["default"]);
var app = express();
app.locals.appTitle = 'JEChat';
// Expose collections to request handlers
// app.use((req, res, next) => {
//   if (!collections.articles || !collections.users) return next(new Error('No collections.'))
//   req.collections = collections
//   return next()
// })
// Express.js configurations
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Express.js middleware configuration
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'))
// app.use(session({secret: '2C44774A-D649-4D44-9535-46E296EF984F',
// resave: true,
// saveUninitialized: true}))
// Authentication middleware
app.use(function (req, res, next) {
    if (req.session && req.session.admin) {
        res.locals.admin = true;
    }
    next();
});
// Authorization Middleware
// const authorize = function (req, res, next) {
//   if (req.session && req.session.admin)
//     return next()
//   else
//     return res.status(401).send()
// }
if (app.get('env') === 'development') {
    app.use(errorHandler());
}
// PAGES&ROUTES
app.get('/about', function (request, response, next) {
    var aboutHTMl = ReactDOMServer.renderToString(About());
    response.render('about', { about: aboutHTMl });
});
// app.get('/', routes.index)
// app.get('/login', routes.user.login)
// app.post('/login', routes.user.authenticate)
// app.get('/logout', routes.user.logout)
// app.get('/admin', authorize, routes.article.admin)
// app.get('/post', authorize, routes.article.post)
// app.post('/post', authorize, routes.article.postArticle)
// app.get('/articles/:slug', routes.article.show)
// REST API ROUTES
// app.all('/api', authorize)
// app.get('/api/articles', routes.article.list)
// app.post('/api/articles', routes.article.add)
// app.put('/api/articles/:id', routes.article.edit)
// app.delete('/api/articles/:id', routes.article.del)
app.all('*', function (req, res) {
    res.status(404).send();
});
// http.createServer(app).listen(app.get('port'), function(){
// console.log('Express server listening on port ' + app.get('port'));
// });
var server = http.createServer(app);
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
