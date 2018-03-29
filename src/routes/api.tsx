import * as mongoose from 'mongoose';
import { User } from '../models/user';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message'

/*
 * GET populate API
 */
export const populate = (req: any, res: any) => {
  var a = new User ({
    _id: new mongoose.Types.ObjectId(),
    userName: 'a',
    email: 'a@gmail.com',
    password: 'aaa'
  });
  a.save();

  var b = new User ({
    _id: new mongoose.Types.ObjectId(),
    userName: 'b',
    email: 'b@gmail.com',
    password: 'bbb',
    friends: a._id
  });
  b.save();

  var c = new User ({
    _id: new mongoose.Types.ObjectId(),
    userName: 'c',
    email: 'c@gmail.com',
    password: 'ccc',
    friends: [a._id, b._id]
  });
  c.save();

  var d = new User ({
    _id: new mongoose.Types.ObjectId(),
    userName: 'd',
    email: 'd@gmail.com',
    password: 'ddd',
    friends: [a._id, b._id, c._id]
  });
  d.save();

  var e = new User ({
    _id: new mongoose.Types.ObjectId(),
    userName: 'e',
    email: 'e@gmail.com',
    password: 'eee',
    friends: [a._id, b._id, c._id, d._id ]
  });
  e.save();

  res.send('Users creation successfull');
}

/*
 * POST fetchContacts API
 */
export const fetchContacts = (req: any, res: any) => {  
  User.findOne({_id: mongoose.Types.ObjectId(req.cookies['userId'])})
  .populate('friends','userName')
  .exec( function (err, friends) {
    if ( err ) {
      res.status(500).send();
    } else if ( friends) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ response: 'success', friends: friends['friends'] }, null, 3));
    }          
  });
}

/*
 * GET login API
 */
export const login = (req: any, res: any) => {  
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
  (error, user) => {
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
}

/*
 * GET logout route.
 */
export const logout = (req: any, res: any, next:any) => {
  res.cookie('auth', false);
  res.clearCookie('userId');
  res.end('Logout!');
  // res.redirect('/')
}


/*
 * GET test API
 */
export const test = (req: any, res:any) => {
  // console.log('---client request cookies header:\n', req.headers['cookie']);
  // res.cookie('name', 'foo');
  res.end('Test!');
}


/*
 * POST registration API
 */
export const registration = (req: any, res:any) => {
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
 * POST getConversations API
 */
export const getConversations = (req: any, res: any, next: any) => {  
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.user._id })
    .select('_id')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      // Set up empty array to hold conversations + most recent message
      let fullConversations: any = [];
      conversations.forEach(function(conversation) {
        Message.find({ 'conversationId': conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: "author",
            select: "profile.firstName profile.lastName"
          })
          .exec(function(err: any, message: any) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            if(fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
  });
}

/*
 * POST getConversations API
 */
export const newConversation = (req: any, res: any, next: any) => {

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
}