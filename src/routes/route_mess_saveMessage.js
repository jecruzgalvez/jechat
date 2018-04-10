"use strict";
exports.__esModule = true;
var message_1 = require("../models/message");
/*
 * GET fetchMessages API
 */
exports.saveMessage = function (req, res, next) {
    var author = req.cookies['userId'];
    var conversationId = req.query.conversationId;
    var body = req.query.body;
    // console.log('conversationId', conversationId);
    // console.log('body', body);
    // console.log('author', author);
    if (!conversationId) {
        res.status(422).send({ error: 'There is not conversationId.' });
        return next();
    }
    if (!body) {
        res.status(422).send({ error: 'There is not body.' });
        return next();
    }
    if (!author) {
        res.status(422).send({ error: 'There is not author.' });
        return next();
    }
    var message = new message_1.Message({
        conversationId: conversationId,
        body: body,
        author: author
    });
    message.save(function (err, newMessage) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }
        else {
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
            // console.log('newMessage=============>', newMessage);
            // res.setHeader('Content-Type', 'application/json');
            // res.send(JSON.stringify({ status: 'messageSaved' }));
        }
        return next();
    });
};
