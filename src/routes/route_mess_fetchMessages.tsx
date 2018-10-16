import * as express from 'express';
import { Message } from '../models/message';

/*
 * GET fetchMessages API
 */
export const fetchMessages = (req: express.Request , res: express.Response, next: Function) => {
  let conversationId = req.query.conversationId;
  // console.log('conversationId', conversationId);

  if (!conversationId) {
    res.status(422).send({ error: 'Please choose a valid conversation Id for your messages.' });
    return next();
  }

  Message.find ({ 'conversationId': conversationId }, {body: 1, author:1, createdAt: 1})
    .sort('createdAt')
    .exec(function(err: any, messages: any) {
      if (err) {
        res.send({ error: err });
        return next(err);
      } else {                  
        // console.log('mesages===============>',messages);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ messages }));
      }
      return next();      
    });
};