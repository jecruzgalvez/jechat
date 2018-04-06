import   fetchConversations       from './act_conv_fetchConversations';
export { fetchConversations };

import   newConversation          from './act_conv_newConversation';
export { newConversation };

import   fetchFriends             from './act_users_fetchFriends';
export { fetchFriends };

import   saveMessage              from './act_mess_saveMessage';
export { saveMessage };

import   fetchMessages            from './act_mess_fetchMessages';
export { fetchMessages };

import   selectConversation       from './act_conv_selectConversation';
export { selectConversation };

//////////////////////////////  setVisibilityFilter //////////////////////////////
export const setVisibilityFilter = (filter: string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
////////////////////////////////////////////////////////////////////////////////
