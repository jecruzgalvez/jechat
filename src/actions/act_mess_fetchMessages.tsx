import axios from 'axios';

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
function fetchMessages_OnSuccess(success: {_id: string, userName: string}[], conversationId: string) {
  return {
    type: FETCH_MESSAGES,
    actualConversation: conversationId,
    payload: success,
  };
}
function fetchMessages_OnError(error: any) {
  return {
    type: FETCH_MESSAGES_ERROR,
    error
  };
}
const fetchMessages = (conversationId: any) => {
  return function (dispatch: any) {
    return API_FetchMessages(conversationId).then(
      success => {
        dispatch(fetchMessages_OnSuccess(success.data['messages'], conversationId));
      },
      error => {
        dispatch(fetchMessages_OnError(error))
      }
    );
  };
}

export default fetchMessages;
export { FETCH_MESSAGES,  FETCH_MESSAGES_ERROR };