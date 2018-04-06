import * as express from 'express';
import { Message } from '../models/message'

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
    else {
      Message.find({ 'conversationId': conversationId }, {body: 1, author:1, createdAt: 1})
      .sort('createdAt')
      .exec(function(err: any, messages: any) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        else {                  
          console.log('mesages===============>',messages);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ messages }));
        }
        return next();      
      });
      // console.log('newMessage=============>', newMessage);
      // res.setHeader('Content-Type', 'application/json');
      // res.send(JSON.stringify({ status: 'messageSaved' }));
    }
    return next();
  });
}
