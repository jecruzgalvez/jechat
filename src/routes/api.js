"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var user_1 = require("../models/user");
var conversation_1 = require("../models/conversation");
var message_1 = require("../models/message");
/*
 * GET populate API
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
/*
 * GET fetchUsers API
 */
exports.fetchContacts = function (req, res, next) {
    user_1.User.find({}, { firstName: 1 })
        .exec(function (err, users) {
        if (err) {
            res.status(500).send();
        }
        else if (users) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ contacts: users }));
        }
    });
};
/*
 * GET login API
 */
exports.login = function (req, res, next) {
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
            res.cookie('userName', user.firstName);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'success', user: user }));
        }
    });
};
/*
 * GET logout route.
 */
exports.logout = function (req, res, next) {
    res.clearCookie('auth');
    res.clearCookie('userId');
    res.end('Logout!');
    // res.redirect('/')
};
/*
 * GET test API
 */
exports.test = function (req, res, next) {
    // console.log('------Actual cookies --------:\n', req.headers['cookie']);
    console.log('------Actual cookies --------:\n', req.cookies);
    res.end('Test!');
};
/*
 * POST registration API
 */
exports.registration = function (req, res, next) {
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
 * GET fetchConversations API
 */
exports.fetchConversations = function (req, res, next) {
    var userId = req.cookies['userId'];
    if (!userId) {
        res.status(422).send({ error: 'Please choose a valid userId for your conversation.' });
        return next();
    }
    // Only return one message from each conversation to display as snippet
    conversation_1.Conversation.find({ participants: userId })
        .select('_id')
        .exec(function (err, conversations) {
        if (err) {
            // console.log('eeeeeeeeeeeeeeeeeeee',err);
            res.send({ error: err });
            return next(err);
        }
        else {
            // console.log('cccccccccccccccccccc',conversations);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ conversations: conversations }));
        }
        return next();
    });
};
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
    // Conversation.find({conversationName: convName}, (err, existingConversation) => {
    //   if(existingConversation.length){
    //     console.log('Exiting conversation: ',existingConversation)
    //     res.status(422).send({ error: 'Please choose a valid conversation name for your conversation.' });
    //     return next();
    //   } else{
    //   }
    // });
    var conversation = new conversation_1.Conversation({
        participants: [userId, recipient].sort()
    });
    conversation.save(function (err, newConversation) {
        if (err) {
            console.log(err);
            res.send({ error: err });
            return next(err);
        }
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
                res.send(JSON.stringify({ conversations: conversations }));
            }
        });
    });
};
/*
 * GET fetchMessages API
 */
exports.fetchMessages = function (req, res, next) {
    var conversationId = req.query.conversationId;
    // conversationId = '5ac3b52b92260d1bf6b81d88';
    console.log('conversationId', conversationId);
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
            console.log('mesages===============>', messages);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ messages: messages }));
        }
        return next();
    });
};
/*
 * GET fetchMessages API
 */
exports.saveMessage = function (req, res, next) {
    var author = req.cookies['userId'];
    var conversationId = req.query.conversationId;
    var body = req.query.body;
    console.log('conversationId', conversationId);
    console.log('body', body);
    console.log('author', author);
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
                    console.log('mesages===============>', messages);
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
