"use strict";
exports.__esModule = true;
var conversation_1 = require("../models/conversation");
var user_1 = require("../models/user");
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
            // console.log(err);
            res.send({ error: err });
            return next(err);
        }
        // console.log('newConversation===============>', newConversation._id)
        conversation_1.Conversation.find({ participants: userId })
            .exec(function (err, conversations) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            else {
                var conversationsWithNames_1 = [];
                conversations.map(function (conversation) {
                    var conv = {
                        participants: [],
                        _id: conversation._id
                    };
                    conversation['participants'].map(function (part) {
                        if (part != userId) {
                            user_1.User.find({ '_id': part }, { firstName: 1 })
                                .sort('-firstName')
                                .populate({
                                path: 'author'
                            })
                                .exec(function (err, participant) {
                                if (err) {
                                    res.send({ error: err });
                                    return next(err);
                                }
                                conv.participants.push(participant[0]['firstName']);
                                if (conv.participants.length === conversation['participants'].length - 1) {
                                    conversationsWithNames_1.push(conv);
                                    if (conversationsWithNames_1.length === conversations.length) {
                                        // console.log(conversationsWithNames);
                                        res.setHeader('Content-Type', 'application/json');
                                        res.send(JSON.stringify({ conversations: conversationsWithNames_1 }));
                                    }
                                }
                            });
                        }
                    });
                });
            }
        });
    });
};
