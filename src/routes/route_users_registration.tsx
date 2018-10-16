import * as express from 'express';
import { User } from '../models/user';

/*
 * GET registration API
 */
export const registration = (req: express.Request , res: express.Response, next: Function) => {

  let firstName = req.query.firstName;
  let email = req.query.email;
  let password = req.query.password;
  // console.log('firstName', firstName);
  // console.log('email', email);
  // console.log('password', password);

  if (!firstName) {
    res.status(422).send({ error: 'Please choose a valid firstName.' });
    return next();
  }
  if (!email) {
    res.status(422).send({ error: 'Please choose a valid email.' });
    return next();
  }
  if (!password) {
    res.status(422).send({ error: 'Please choose a valid password.' });
    return next();
  }

  User.find(
    { 'email' : email },
    ( err, existingEmail ) => {

      if ( err ) {
        res.status(500).send();
      }
      if ( existingEmail.toString() === '' ) {
        const newUser = new User({
          firstName,
          email,
          password 
        });

        newUser.save( (error: any, newUserInserted: any) => {
          if (error) {
            // console.log(err);
            res.send({ error: error });
            return next(error);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: 'success', existingEmail: false }, null, 3));
          }
        }); // newUser.save
      } else {
        // console.log('The user already exist, impossible to register');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ response: 'fail', existingEmail: true }, null, 3));
      }    
    }
  ); // User.find
};