import * as express from 'express';
import { Conversation } from '../models/conversation';
import { User } from '../models/user';

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

    // console.log('newConversation===============>', newConversation._id)

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
  });
}