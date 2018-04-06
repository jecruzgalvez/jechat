import * as express from 'express';

import { populate }            from './route_users_populate';
export { populate };

import { fetchFriends }        from './route_users_fetchFriends';
export { fetchFriends };

import { fetchContacts }       from './route_users_fetchContacts';
export { fetchContacts };

import { login }               from './route_users_login';
export { login };

import { logout }              from './route_users_logout';
export { logout };

import { registration }        from './route_users_registration';
export { registration };

import { newConversation }     from './route_conv_newConversation';
export { newConversation };

import { fetchConversations }  from './route_conv_fetchConversations';
export { fetchConversations };

import { fetchMessages }       from './route_mess_fetchMessages';
export { fetchMessages };

import { saveMessage }         from './route_mess_saveMessage';
export { saveMessage };

export const index = (req: express.Request , res: express.Response, next: Function) => {
  next();
}