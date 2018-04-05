"use strict";
exports.__esModule = true;
var user_1 = require("../models/user");
/*
 * POST registration API
 */
exports.registration = function (req, res, next) {
    user_1.User.find({ 'email': req.body.email }, function (err, existingEmail) {
        console.log(err, existingEmail);
        if (err) {
            res.status(500).send();
        }
        if (existingEmail.toString() === '') {
            user_1.User.insertMany(req.body);
            console.log(req.body);
            console.log('User registration successfull');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'success', existingEmail: false }, null, 3));
        }
        else {
            console.log('The user already exist, impossible to register');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'fail', existingEmail: true }, null, 3));
        }
    });
};
