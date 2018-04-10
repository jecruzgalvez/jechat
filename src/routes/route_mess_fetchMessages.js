"use strict";
exports.__esModule = true;
var message_1 = require("../models/message");
/*
 * GET fetchMessages API
 */
exports.fetchMessages = function (req, res, next) {
    var conversationId = req.query.conversationId;
    // console.log('conversationId', conversationId);
    if (!conversationId) {
        res.status(422).send({ error: 'Please choose a valid conversation Id for your messages.' });
        return next();
    }
    message_1.Message.find({ 'conversationId': conversationId }, { body: 1, author: 1, createdAt: 1 })
        .sort('createdAt')
        .exec(function (err, messages) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }
        else {
            // console.log('mesages===============>',messages);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ messages: messages }));
        }
        return next();
    });
};
