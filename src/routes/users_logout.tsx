import * as express from 'express';

/*
 * GET logout route.
 */
export const logout = (req: express.Request , res: express.Response, next: Function) => {
  res.clearCookie('auth');
  res.clearCookie('userId');
  res.end('Logout!');
  // res.redirect('/')
}