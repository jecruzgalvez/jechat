"use strict";
exports.__esModule = true;
var conversation_1 = require("../models/conversation");
/*
 * GET newConversations API
 */
exports.newConversation = function (req, res, next) {
    var userId = req.cookies['userId'];
    var recipient = req.query.recipient;
    if (!userId) {
        res.status(422).send({ error: 'Please choose a valid userId for your conversation.' });
        return next();
    }
    if (!recipient) {
        res.status(422).send({ error: 'Please choose a valid recipient for your conversation.' });
        return next();
    }
    var conversation = new conversation_1.Conversation({
        participants: [userId, recipient].sort()
    });
    conversation.save(function (err, newConversation) {
        if (err) {
            console.log(err);
            res.send({ error: err });
            return next(err);
        }
        console.log('newConversation===============>', newConversation._id);
        conversation_1.Conversation.find({ participants: userId })
            .exec(function (err, conversations) {
            if (err) {
                // console.log('eeeeeeeeeeeeeeeeeeee',err);
                res.send({ error: err });
                return next(err);
            }
            else {
                // console.log('cccccccccccccccccccc',conversations);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ conversations: conversations, newConversation: newConversation._id }));
            }
        });
    });
};
