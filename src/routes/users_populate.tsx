import * as express from 'express';
import * as mongoose from 'mongoose';
import { User } from '../models/user';

/*
 * GET populate
 */

export const populate = (req: express.Request , res: express.Response, next: Function) => {
  var a = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'a',
    email: 'a@gmail.com',
    password: 'aaa'
  });
  a.save();

  var b = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'b',
    email: 'b@gmail.com',
    password: 'bbb',
    friends: a._id
  });
  b.save();

  var c = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'c',
    email: 'c@gmail.com',
    password: 'ccc',
    friends: [a._id, b._id]
  });
  c.save();

  var d = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'd',
    email: 'd@gmail.com',
    password: 'ddd',
    friends: [a._id, b._id, c._id]
  });
  d.save();

  var e = new User ({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'e',
    email: 'e@gmail.com',
    password: 'eee',
    friends: [a._id, b._id, c._id, d._id ]
  });
  e.save();

  res.send('Users creation successfull');
}