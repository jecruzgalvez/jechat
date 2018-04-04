import axios from 'axios';


//////////////////////////////  setVisibilityFilter //////////////////////////////
export const setVisibilityFilter = (filter: string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////    fetchFriends   //////////////////////////////
const FETCH_FRIENDS       = 'friends/FETCH_FRIENDS';
const FETCH_FRIENDS_ERROR = 'friends/FETCH_FRIENDS_ERROR';
function API_FetchFriends() {
  return axios.get('/api/fetchFriends')
}
function fetchFriends_OnSuccess(success: {_id: string, userName: string}[]) {
  return {
    type: FETCH_FRIENDS,
    payload: success
  };
}
function fetchFriends_OnError(error: any) {
  return {
    type: FETCH_FRIENDS_ERROR,
    error
  };
}
export function fetchFriends() {  
  return function (dispatch: any) {
    return API_FetchFriends().then(
      success => {
        dispatch(fetchFriends_OnSuccess(success.data['friends']));
      },
      error => {
        dispatch(fetchFriends_OnError(error))
      }
    );
    
  };
}
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////    newConversation   //////////////////////////////
const NEW_CONVERSATION       = 'conversation/NEW_CONVERSATION';
const NEW_CONVERSATION_ERROR = 'conversation/NEW_CONVERSATION_ERROR';
function API_NewConversation(recipient: any) {
  return axios.get('/api/newConversation', {
    params: {
      recipient
    }
  });
}
function newConversation_OnSuccess(success: {_id: string, userName: string}[]) {
  return {
    type: NEW_CONVERSATION,
    payload: success
  };
}
function newConversation_OnError(error: any) {
  return {
    type: NEW_CONVERSATION_ERROR,
    error
  };
}
export function newConversation(recipient: any) {
  return function (dispatch: any) {
    return API_NewConversation(recipient).then(
      success => {
        dispatch(newConversation_OnSuccess(success.data['conversations']));
      },
      error => {
        dispatch(newConversation_OnError(error))
      }
    );
  };
}
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////    fetchConversations   //////////////////////////////
const FETCH_CONVERSATIONS       = 'conversation/FETCH_CONVERSATIONS';
const FETCH_CONVERSATIONS_ERROR = 'conversation/FETCH_CONVERSATIONS_ERROR';
function API_FetchConversations() {
  return axios.get('/api/fetchConversations')
}
function fetchConversations_OnSuccess(success: {_id: string, userName: string}[]) {
  return {
    type: FETCH_CONVERSATIONS,
    payload: success
  };
}
function fetchConversations_OnError(error: any) {
  return {
    type: FETCH_CONVERSATIONS_ERROR,
    error
  };
}
export function fetchConversations() {
  return function (dispatch: any) {
    return API_FetchConversations().then(
      success => {
        // debugger
        dispatch(fetchConversations_OnSuccess(success.data['conversations']));
      },
      error => {
        dispatch(fetchConversations_OnError(error))
      }
    );
  };
}
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////    saveMessages   //////////////////////////////
const SAVE_MESSAGE       = 'messages/SAVE_MESSAGE';
const SAVE_MESSAGE_ERROR = 'messages/SAVE_MESSAGE_ERROR';
function API_SaveMessage(conversationId: any, body: any) {
  return axios.get('/api/saveMessage', {
    params: {
      conversationId,
      body
    }
  });
}
function saveMessage_OnSuccess(success: {_id: string, userName: string}[]) {
  return {
    type: SAVE_MESSAGE,
    payload: success
  };
}
function saveMessage_OnError(error: any) {
  return {
    type: SAVE_MESSAGE_ERROR,
    error
  };
}
export function saveMessage(conversationId: any, body: any) {
  return function (dispatch: any) {
    return API_SaveMessage(conversationId, body).then(
      success => {
        dispatch(saveMessage_OnSuccess(success.data['response']));
      },
      error => {
        dispatch(saveMessage_OnError(error))
      }
    );
  };
}
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////    fetchMessages   //////////////////////////////
const FETCH_MESSAGES       = 'messages/FETCH_MESSAGES';
const FETCH_MESSAGES_ERROR = 'messages/FETCH_MESSAGES_ERROR';
function API_FetchMessages(conversationId: any) {
  return axios.get('/api/fetchMessages', {
    params: {
      conversationId
    }
  });
}
function fetchMessages_OnSuccess(success: {_id: string, userName: string}[]) {
  return {
    type: FETCH_MESSAGES,
    payload: success
  };
}
function fetchMessages_OnError(error: any) {
  return {
    type: FETCH_MESSAGES_ERROR,
    error
  };
}
export function fetchMessages(conversationId: any) {
  return function (dispatch: any) {
    return API_FetchMessages(conversationId).then(
      success => {
        dispatch(fetchMessages_OnSuccess(success.data['messages']));
      },
      error => {
        dispatch(fetchMessages_OnError(error))
      }
    );
  };
}
////////////////////////////////////////////////////////////////////////////////
