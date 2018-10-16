import * as express from 'express';
import { User } from '../models/user';

/*
 * GET login API
 */
export const login = (req: express.Request , res: express.Response, next: Function) => {
  let email = req.query.email;
  let password = req.query.password;

  if (!email || !password) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ response: 'fail', error: 'Please enter your email and password.' }));
  }

  User.findOne ({
    email,
    password
  }, (error, user: any) => {
    if (error) {
      res.status(500).send();
    }
    if (!user) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ response: 'fail', error: 'Incorrect email&password combination.' }));
    } else {      
      res.cookie('auth', true);
      res.cookie('userId', user._id);
      res.cookie('userName', user.firstName);

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ response: 'success', user: user }));      
    }
  });
};