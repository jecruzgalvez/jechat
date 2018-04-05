import * as express from 'express';

import { populate }            from './users_populate';
export { populate };

import { fetchFriends }        from './users_fetchFriends';
export { fetchFriends };

import { fetchContacts }       from './users_fetchContacts';
export { fetchContacts };

import { login }               from './users_login';
export { login };

import { logout }              from './users_logout';
export { logout };

import { registration }        from './users_registration';
export { registration };

import { newConversation }     from './conversations_newConversation';
export { newConversation };

import { fetchConversations }  from './conversations_fetchConversations';
export { fetchConversations };

import { fetchMessages }       from './messages_fetchMessages';
export { fetchMessages };

import { saveMessage }         from './messages_saveMessage';
export { saveMessage };

export const index = (req: express.Request , res: express.Response, next: Function) => {
  next();
}