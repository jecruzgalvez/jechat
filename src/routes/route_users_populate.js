"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var user_1 = require("../models/user");
/*
 * GET populate
 */
exports.populate = function (req, res, next) {
    var a = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Angel',
        email: 'a@gmail.com',
        password: 'aaa'
    });
    a.save();
    var b = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Berenice',
        email: 'b@gmail.com',
        password: 'bbb'
    });
    b.save();
    var c = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Carlos',
        email: 'c@gmail.com',
        password: 'ccc'
    });
    c.save();
    var d = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'David',
        email: 'd@gmail.com',
        password: 'ddd'
    });
    d.save();
    var e = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Elpidio',
        email: 'e@gmail.com',
        password: 'eee'
    });
    e.save();
    res.send('Users creation successfull');
};
