"use strict";
exports.__esModule = true;
var user_1 = require("../models/user");
/*
 * GET newFriend API
 */
exports.newFriend = function (req, res, next) {
    var userId = req.cookies['userId'];
    var newFriendId = req.query.newFriendId;
    if (!userId) {
        res.status(422).send({ error: 'Please choose a valid userId.' });
        return next();
    }
    if (!newFriendId) {
        res.status(422).send({ error: 'Please choose a valid newFriendId.' });
        return next();
    }
    if (userId === newFriendId) {
        res.status(422).send({ error: 'No puedes ser tu propio amigo.' });
        return next();
    }
    // console.log("userId, newFriendId", userId, newFriendId);
    var conditions = {
        _id: userId,
        friends: { $nin: [newFriendId] }
    };
    var update = {
        $push: { friends: newFriendId }
    };
    user_1.User.findOneAndUpdate(conditions, update)
        .exec(function (err, friends) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }
        else {
            // if(existingFriend !== null ) {
            // console.log('existingFriend', friends);
            //   res.setHeader('Content-Type', 'application/json');
            //   res.send(JSON.stringify({ friends: null }));
            // }
            // else {
            //   User.
            // }
        }
    });
    next();
};
