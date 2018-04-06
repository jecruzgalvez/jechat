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
        firstName: 'a',
        email: 'a@gmail.com',
        password: 'aaa'
    });
    a.save();
    var b = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'b',
        email: 'b@gmail.com',
        password: 'bbb',
        friends: a._id
    });
    b.save();
    var c = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'c',
        email: 'c@gmail.com',
        password: 'ccc',
        friends: [a._id, b._id]
    });
    c.save();
    var d = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'd',
        email: 'd@gmail.com',
        password: 'ddd',
        friends: [a._id, b._id, c._id]
    });
    d.save();
    var e = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'e',
        email: 'e@gmail.com',
        password: 'eee',
        friends: [a._id, b._id, c._id, d._id]
    });
    e.save();
    res.send('Users creation successfull');
};
