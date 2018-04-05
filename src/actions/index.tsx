import fetchConversations from './action_conv_fetchConversations';
export { fetchConversations };

import newConversation from './action_conv_newConversation';
export { newConversation };

import fetchFriends from './action_users_fetchFriends';
export { fetchFriends };

import saveMessage from './action_mess_saveMessage';
export { saveMessage};

import fetchMessages from './action_mess_fetchMessages';
export { fetchMessages};

import selectConversation from './action_conv_selectConversation';
export { selectConversation };

//////////////////////////////  setVisibilityFilter //////////////////////////////
export const setVisibilityFilter = (filter: string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
////////////////////////////////////////////////////////////////////////////////
