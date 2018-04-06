"use strict";
exports.__esModule = true;
var conversation_1 = require("../models/conversation");
/*
 * GET fetchConversations API
 */
exports.fetchConversations = function (req, res, next) {
    var userId = req.cookies['userId'];
    if (!userId) {
        res.status(422).send({ error: 'Please choose a valid userId for your conversation.' });
        return next();
    }
    conversation_1.Conversation.find({ participants: userId })
        .exec(function (err, conversations) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ conversations: conversations }));
        }
        return next();
    });
};
