import * as express from 'express';
import * as mongoose from 'mongoose';
import { User } from '../models/user';

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