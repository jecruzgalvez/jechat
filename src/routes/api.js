"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var user_1 = require("../models/user");
var conversation_1 = require("../models/conversation");
var message_1 = require("../models/message");
/*
 * GET populate API
 */
exports.populate = function (req, res) {
    var a = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        userName: 'a',
        email: 'a@gmail.com',
        password: 'aaa'
    });
    a.save();
    var b = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        userName: 'b',
        email: 'b@gmail.com',
        password: 'bbb',
        friends: a._id
    });
    b.save();
    var c = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        userName: 'c',
        email: 'c@gmail.com',
        password: 'ccc',
        friends: [a._id, b._id]
    });
    c.save();
    var d = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        userName: 'd',
        email: 'd@gmail.com',
        password: 'ddd',
        friends: [a._id, b._id, c._id]
    });
    d.save();
    var e = new user_1.User({
        _id: new mongoose.Types.ObjectId(),
        userName: 'e',
        email: 'e@gmail.com',
        password: 'eee',
        friends: [a._id, b._id, c._id, d._id]
    });
    e.save();
    res.send('Users creation successfull');
};
/*
 * POST fetchContacts API
 */
exports.fetchContacts = function (req, res) {
    user_1.User.findOne({ _id: mongoose.Types.ObjectId(req.cookies['userId']) })
        .populate('friends', 'userName')
        .exec(function (err, friends) {
        if (err) {
            res.status(500).send();
        }
        else if (friends) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'success', friends: friends['friends'] }, null, 3));
        }
    });
};
/*
 * GET login API
 */
exports.login = function (req, res) {
    var email = req.query.email;
    var password = req.query.password;
    if (!email || !password) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ response: 'fail', error: 'Please enter your email and password.' }));
    }
    user_1.User.findOne({
        email: email,
        password: password
    }, function (error, user) {
        if (error) {
            res.status(500).send();
        }
        if (!user) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'fail', error: 'Incorrect email&password combination.' }));
        }
        else {
            res.cookie('auth', true);
            res.cookie('userId', user._id);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'success', user: user }));
        }
    });
};
/*
 * GET logout route.
 */
exports.logout = function (req, res, next) {
    res.cookie('auth', false);
    res.clearCookie('userId');
    res.end('Logout!');
    // res.redirect('/')
};
/*
 * GET test API
 */
exports.test = function (req, res) {
    // console.log('---client request cookies header:\n', req.headers['cookie']);
    // res.cookie('name', 'foo');
    res.end('Test!');
};
/*
 * POST registration API
 */
exports.registration = function (req, res) {
    user_1.User.find({ 'email': req.body.email }, function (err, existingEmail) {
        console.log(err, existingEmail);
        if (err) {
            res.status(500).send();
        }
        if (existingEmail.toString() === '') {
            user_1.User.insertMany(req.body);
            console.log(req.body);
            console.log('User registration successfull');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'success', existingEmail: false }, null, 3));
        }
        else {
            console.log('The user already exist, impossible to register');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'fail', existingEmail: true }, null, 3));
        }
    });
};
/*
 * POST getConversations API
 */
exports.getConversations = function (req, res, next) {
    // Only return one message from each conversation to display as snippet
    conversation_1.Conversation.find({ participants: req.user._id })
        .select('_id')
        .exec(function (err, conversations) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }
        // Set up empty array to hold conversations + most recent message
        var fullConversations = [];
        conversations.forEach(function (conversation) {
            message_1.Message.find({ 'conversationId': conversation._id })
                .sort('-createdAt')
                .limit(1)
                .populate({
                path: "author",
                select: "profile.firstName profile.lastName"
            })
                .exec(function (err, message) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }
                fullConversations.push(message);
                if (fullConversations.length === conversations.length) {
                    return res.status(200).json({ conversations: fullConversations });
                }
            });
        });
    });
};
/*
 * POST getConversations API
 */
exports.newConversation = function (req, res, next) {
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', req.headers['cookie']);
    // if(!req.params.recipient) {
    //   res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    //   return next();
    // }
    // if(!req.body.composedMessage) {
    //   res.status(422).send({ error: 'Please enter a message.' });
    //   return next();
    // }
    // const conversation = new Conversation({
    //   // participants: [req.user._id, req.params.recipient]
    //   participants: [req.user._id, req.params.recipient]
    // });
    // console.log(conversation);
    // conversation.save(function(err, newConversation) {
    //   if (err) {
    //     res.send({ error: err });
    //     return next(err);
    //   }
    //   const message = new Message({
    //     conversationId: newConversation._id,
    //     body: req.body.composedMessage,
    //     author: req.user._id
    //   });
    //   message.save(function(err, newMessage) {
    //     if (err) {
    //       res.send({ error: err });
    //       return next(err);
    //     }
    //     res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
    //     return next();
    //   });
    // });
};
