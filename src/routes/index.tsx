import * as express from 'express';
import * as api from './api';

/*
 * GET home page.
 */
const index = (req: express.Request , res: express.Response, next: Function) => {
  next();
}

export { index };
export { api };
