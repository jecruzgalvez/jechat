import * as express from 'express';
import { User } from '../models/user';

/*
 * POST registration API
 */
export const registration = (req: express.Request , res: express.Response, next: Function) => {
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