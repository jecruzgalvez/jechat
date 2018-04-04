import * as express from 'express';
import * as mongoose from 'mongoose';
import { User } from '../models/user';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message'

/*
 * GET populate API
 */
export const populate = (req: express.Request , res: express.Response, next: Function) => {
  var a = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'a',
    email: 'a@gmail.com',
    password: 'aaa'
  });
  a.save();

  var b = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'b',
    email: 'b@gmail.com',
    password: 'bbb',
    friends: a._id
  });
  b.save();

  var c = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'c',
    email: 'c@gmail.com',
    password: 'ccc',
    friends: [a._id, b._id]
  });
  c.save();

  var d = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'd',
    email: 'd@gmail.com',
    password: 'ddd',
    friends: [a._id, b._id, c._id]
  });
  d.save();

  var e = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'e',
    email: 'e@gmail.com',
    password: 'eee',
    friends: [a._id, b._id, c._id, d._id ]
  });
  e.save();

  res.send('Users creation successfull');
}

/*
 * GET fetchFriends API
 */
export const fetchFriends = (req: express.Request , res: express.Response, next: Function) => { 
    let userId = mongoose.Types.ObjectId(req.cookies['userId']);
    if(!userId) {
      res.status(500).send();
    }  
    User.findOne({_id: userId})
    .populate('friends','firstName')
    .exec( function (err, friends) {
      if ( err ) {
        res.status(500).send();
      } else if ( friends) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ friends: friends['friends'] }));
      }
    });  
 }

/*
 * GET fetchUsers API
 */
export const fetchContacts = (req: express.Request , res: express.Response, next: Function) => { 
  User.find({}, {firstName: 1})
  .exec( function (err, users) {
    if ( err ) {
      res.status(500).send();
    } else if ( users) {
      res.setHeader('Content-Type', 'application/json');
      res.send( JSON.stringify({ contacts: users }));
    }          
  });    
}

/*
 * GET login API
 */
export const login = (req: express.Request , res: express.Response, next: Function) => {
  let email= req.query.email;
  let password= req.query.password;

  if (!email || !password) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ response: 'fail', error: 'Please enter your email and password.' }));
  }
  User.findOne({
    email,
    password
  }, 
  (error, user: any) => {
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
}

/*
 * GET logout route.
 */
export const logout = (req: express.Request , res: express.Response, next: Function) => {
  res.clearCookie('auth');
  res.clearCookie('userId');
  res.end('Logout!');
  // res.redirect('/')
}

/*
 * GET test API
 */
export const test = (req: express.Request , res: express.Response, next: Function) => {
  // console.log('------Actual cookies --------:\n', req.headers['cookie']);
  console.log('------Actual cookies --------:\n', req.cookies);
  res.end('Test!');
}

/*
 * POST registration API
 */
export const registration = (req: express.Request , res: express.Response, next: Function) => {
  User.find(
    { 'email' : req.body.email },
    ( err, existingEmail ) => {
      console.log(err, existingEmail);
      if ( err ) {
        res.status(500).send();
      }
      if ( existingEmail.toString() === '' ) {
        User.insertMany(req.body);
        console.log(req.body);
        console.log('User registration successfull');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ response: 'success', existingEmail: false }, null, 3));
      } else {
        console.log('The user already exist, impossible to register');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ response: 'fail', existingEmail: true }, null, 3));
      }
    }
  );
}

/*
 * GET fetchConversations API
 */
export const fetchConversations = (req: express.Request , res: express.Response, next: Function) => {
  let userId = req.cookies['userId']; 
  
  if(!userId) {
    res.status(422).send({ error: 'Please choose a valid userId for your conversation.' });
    return next();
  }

  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: userId })
    .select('_id')
    .exec(function(err, conversations) {
      if (err) {
        // console.log('eeeeeeeeeeeeeeeeeeee',err);
        res.send({ error: err });
        return next(err);
      }
      else {                  
        // console.log('cccccccccccccccccccc',conversations);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ conversations }));
      }

      return next();
  });
}

/*
 * GET newConversations API
 */
export const newConversation = (req: express.Request , res: express.Response, next: Function) => {
  let userId = req.cookies['userId'];
  let recipient = req.query.recipient;

  if(!userId) {
    res.status(422).send({ error: 'Please choose a valid userId for your conversation.' });
    return next();
  }
  if(!recipient) {
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

  const conversation = new Conversation({
    participants: [userId, recipient].sort()
  });

  conversation.save(function(err, newConversation) {
    if (err) {
      console.log(err);
      res.send({ error: err });
      return next(err);
    }

    Conversation.find({ participants: userId })
    // .select('_id')
    .exec(function(err, conversations) {
      if (err) {
        // console.log('eeeeeeeeeeeeeeeeeeee',err);
        res.send({ error: err });
        return next(err);
      }
      else {                  
        // console.log('cccccccccccccccccccc',conversations);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ conversations }));
      }
    });
  });
}

/*
 * GET fetchMessages API
 */
export const fetchMessages = (req: express.Request , res: express.Response, next: Function) => {
  // let userId = req.cookies['userId'];
  let conversationId = req.query.conversationId;
  
  // conversationId = '5ac3b52b92260d1bf6b81d88';
  console.log('conversationId', conversationId);

  if(!conversationId) {
    res.status(422).send({ error: 'Please choose a valid conversation Id for your messages.' });
    return next();
  }

  // Set up empty array to hold conversations + most recent message
  // let fullConversations: any = [];
  // conversations.forEach(function(conversation) {
    Message.find({ 'conversationId': conversationId })
      // .sort('-createdAt')
      // .limit(1)
      // .populate({
      //   path: "author"
      //   // select: "profile.firstName profile.lastName"
      // })
      .exec(function(err: any, messages: any) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        console.log('mesages===============>',messages)
        // fullConversations.push(message);

        // if(fullConversations.length === conversations.length) {

          // console.log(fullConversations);
          // return res.status(200).json({ conversations: fullConversations });
        // }
      });
  // });
}

/*
 * GET fetchMessages API
 */
export const saveMessage = (req: express.Request , res: express.Response, next: Function) => {

  let author = req.cookies['userId'];
  let conversationId = req.query.conversationId;
  let body = req.query.body;

  console.log('conversationId', conversationId);
  console.log('body', body);
  console.log('author', author);

  if(!conversationId) {
    res.status(422).send({ error: 'There is not conversationId.' });
    return next();
  }
  if(!body) {
    res.status(422).send({ error: 'There is not body.' });
    return next();
  }
  if(!author) {
    res.status(422).send({ error: 'There is not author.' });
    return next();
  }

  const message = new Message({
    conversationId: conversationId,
    body: body,
    author: author
  });

  message.save(function(err, newMessage) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    console.log('newMessage=============>', newMessage);

    // res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
    return next();
  });
}