"use strict";
exports.__esModule = true;
var user_1 = require("../models/user");
/*
 * GET login API
 */
exports.login = function (req, res, next) {
    var email = req.query.email;
    var password = req.query.password;
    if (!email || !password) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ response: 'fail', error: 'Please enter your email and password.' }));
    }
    user_1.User.findOne({
        email: email,
        password: password
    }, function (error, user) {
        if (error) {
            res.status(500).send();
        }
        if (!user) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'fail', error: 'Incorrect email&password combination.' }));
        }
        else {
            res.cookie('auth', true);
            res.cookie('userId', user._id);
            res.cookie('userName', user.firstName);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'success', user: user }));
        }
    });
};
