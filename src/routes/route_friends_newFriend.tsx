import * as express from 'express';
import { User } from '../models/user';

/*
 * GET newFriend API
 */
export const newFriend = (req: express.Request , res: express.Response, next: Function) => {
  let userId = req.cookies['userId'];
  let newFriendId = req.query.newFriendId;

  if (!userId) {
    res.status(422).send({ error: 'Please choose a valid userId.' });
    return next();
  }
  if (!newFriendId) {
    res.status(422).send({ error: 'Please choose a valid newFriendId.' });
    return next();
  }
  if (userId === newFriendId) {
    res.status(422).send({ error: 'No puedes ser tu propio amigo.' });
    return next();
  }

  // console.log("userId, newFriendId", userId, newFriendId);

  let conditions = {
    _id: userId,
    friends: { $nin: [newFriendId] }
  };
  let update = {
    $push: {friends: newFriendId}
  };

  User.findOneAndUpdate( conditions, update )
    .exec(function(err, friends) {
      if (err) {
        res.send({ error: err });
        return next(err);
      } else {
        // if(existingFriend !== null ) {
        // console.log('existingFriend', friends);
        //   res.setHeader('Content-Type', 'application/json');
        //   res.send(JSON.stringify({ friends: null }));
        // }
        // else {
        //   User.
        // }
      }  
  });
  next();
};