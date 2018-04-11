import   fetchConversations       from './act_conv_fetchConversations';
export { fetchConversations };

import   newConversation          from './act_conv_newConversation';
export { newConversation };

import   fetchFriends             from './act_friends_fetchFriends';
export { fetchFriends };

import   newFriend                from './act_friends_newFriend';
export { newFriend };

import   fetchUsers               from './act_users_fetchUsers';
export { fetchUsers };

import   saveMessage              from './act_mess_saveMessage';
export { saveMessage };

import   fetchMessages            from './act_mess_fetchMessages';
export { fetchMessages };

import   selectConversation       from './act_conv_selectConversation';
export { selectConversation };

import   logout                   from './act_logout';
export { logout };


//////////////////////////////  setVisibilityFilter //////////////////////////////
export const setVisibilityFilter = (filter: string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
////////////////////////////////////////////////////////////////////////////////
