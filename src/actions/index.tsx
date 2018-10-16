import   newConversation          from './actionConversations_newConversation';
export { newConversation };

import   fetchConversations       from './actionConversations_fetchConversations';
export { fetchConversations };

import   selectConversation       from './actionConversations_selectConversation';
export { selectConversation };

import   fetchUsers               from './actionUsers_fetchUsers';
export { fetchUsers };

import   newFriend                from './actionFriends_newFriend';
export { newFriend };

import   fetchFriends             from './actionFriends_fetchFriends';
export { fetchFriends };

import   saveMessage              from './actionMessages_saveMessage';
export { saveMessage };

import   fetchMessages            from './actionMessages_fetchMessages';
export { fetchMessages };

import   logout                   from './action_logout';
export { logout };

import   selectLanguage           from './actionSettings_selectLanguage';
export { selectLanguage };


//////////////////////////////  setVisibilityFilter //////////////////////////////
export const setVisibilityFilter = (filter: string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
////////////////////////////////////////////////////////////////////////////////
