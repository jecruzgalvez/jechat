"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var user_1 = require("../models/user");
/*
 * GET fetchFriends API
 */
exports.fetchFriends = function (req, res, next) {
    var userId = mongoose.Types.ObjectId(req.cookies['userId']);
    if (!userId) {
        res.status(500).send();
    }
    user_1.User.findOne({ _id: userId })
        .populate('friends', 'firstName')
        .exec(function (err, friends) {
        if (err) {
            res.status(500).send();
        }
        else if (friends) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ friends: friends['friends'] }));
        }
    });
};
