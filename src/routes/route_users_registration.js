"use strict";
exports.__esModule = true;
var user_1 = require("../models/user");
/*
 * GET registration API
 */
exports.registration = function (req, res, next) {
    var firstName = req.query.firstName;
    var email = req.query.email;
    var password = req.query.password;
    // console.log('firstName', firstName);
    // console.log('email', email);
    // console.log('password', password);
    if (!firstName) {
        res.status(422).send({ error: 'Please choose a valid firstName.' });
        return next();
    }
    if (!email) {
        res.status(422).send({ error: 'Please choose a valid email.' });
        return next();
    }
    if (!password) {
        res.status(422).send({ error: 'Please choose a valid password.' });
        return next();
    }
    user_1.User.find({ 'email': email }, function (err, existingEmail) {
        if (err) {
            res.status(500).send();
        }
        if (existingEmail.toString() === '') {
            var newUser = new user_1.User({
                firstName: firstName,
                email: email,
                password: password
            });
            newUser.save(function (error, newUserInserted) {
                if (error) {
                    // console.log(err);
                    res.send({ error: error });
                    return next(error);
                }
                else {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ response: 'success', existingEmail: false }, null, 3));
                }
            }); // newUser.save
        }
        else {
            // console.log('The user already exist, impossible to register');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'fail', existingEmail: true }, null, 3));
        }
    }); // User.find
};
