import * as express from 'express';
import { User } from '../models/user';

/*
 * GET fetchUsers API
 */
export const fetchUsers = (req: express.Request , res: express.Response, next: Function) => { 

  User.find({}, {firstName: 1})
  .exec( function (err, users) {
    if ( err ) {
      res.status(500).send();
    } else if ( users) {
      debugger
      res.setHeader('Content-Type', 'application/json');
      res.send( JSON.stringify({ users: users }));
    }          
  });    
}
