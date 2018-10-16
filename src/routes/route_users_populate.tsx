import * as express from 'express';
import * as mongoose from 'mongoose';
import { User } from '../models/user';

/*
 * GET populate
 */

export const populate = (req: express.Request , res: express.Response, next: Function) => {
  var a = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Angel',
    email: 'a@gmail.com',
    password: 'aaa'
  });
  a.save();

  var b = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Berenice',
    email: 'b@gmail.com',
    password: 'bbb'
  });
  b.save();

  var c = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Carlos',
    email: 'c@gmail.com',
    password: 'ccc'
  });
  c.save();

  var d = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'David',
    email: 'd@gmail.com',
    password: 'ddd'
  });
  d.save();

  var e = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Elpidio',
    email: 'e@gmail.com',
    password: 'eee'
  });
  e.save();

  res.send('Users creation successfull');
};