import * as express from 'express';
import { Conversation } from '../models/conversation';
import { User } from '../models/user';

/*
 * GET fetchConversations API
 */
export const fetchConversations = (req: express.Request , res: express.Response, next: Function) => {
  let userId = req.cookies['userId']; 
  
  if(!userId) {
    res.status(422).send({ error: 'Please choose a valid userId.' });
    return next();
  }

  Conversation.find({ participants: userId })
    .exec(function(err, conversations) {
  
    if (err) {
      res.send({ error: err });
      return next(err);
    }
    else {     
      // console.log('conversations',conversations);

      interface convsI {
          participants: string[],
          _id: ''
      }
      let conversationsWithNames: convsI[] = [];

      conversations.map((conversation) => {

        let conv : convsI = {
          participants: [],
         _id: conversation._id
        }        

        conversation['participants'].map( (part: any) => {          

          if(part != userId){
            User.find({ '_id': part }, {firstName: 1})
              .sort('-firstName')
              .populate({
                path: "author"
              })             
            .exec(function(err, participant) {
              if (err) {
                res.send({ error: err });
                return next(err);
              }
              conv.participants.push(participant[0]['firstName']);

              if( conv.participants.length === conversation['participants'].length -1) {
                conversationsWithNames.push(conv);

                if(conversationsWithNames.length === conversations.length) {
                  // console.log(conversationsWithNames);
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.stringify({ conversations: conversationsWithNames }));
                }
              }
            });
          }
        });
      });
    }
  });
}