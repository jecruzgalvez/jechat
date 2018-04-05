import * as express from 'express';
import { Conversation } from '../models/conversation';

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

  const conversation = new Conversation({
    participants: [userId, recipient].sort()
  });

  conversation.save(function(err, newConversation) {
    if (err) {
      console.log(err);
      res.send({ error: err });
      return next(err);
    }

    console.log('newConversation===============>', newConversation._id)

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
        res.send(JSON.stringify({ conversations, newConversation: newConversation._id }));
      }
    });
  });
}