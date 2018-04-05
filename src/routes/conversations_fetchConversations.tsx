import * as express from 'express';
import { Conversation } from '../models/conversation';

/*
 * GET fetchConversations API
 */
export const fetchConversations = (req: express.Request , res: express.Response, next: Function) => {
  let userId = req.cookies['userId']; 
  
  if(!userId) {
    res.status(422).send({ error: 'Please choose a valid userId for your conversation.' });
    return next();
  }

  Conversation.find({ participants: userId })
    .select('_id')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ conversations }));
      }

      return next();
  });
}