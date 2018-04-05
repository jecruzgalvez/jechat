import axios from 'axios';

//////////////////////////////    fetchConversations   //////////////////////////////
const FETCH_CONVERSATIONS       = 'conversation/FETCH_CONVERSATIONS';
const FETCH_CONVERSATIONS_ERROR = 'conversation/FETCH_CONVERSATIONS_ERROR';
function API_FetchConversations() {
  return axios.get('/api/fetchConversations')
}
function fetchConversations_OnSuccess(success: {_id: string}[]) {
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
const fetchConversations = () => {
  return function (dispatch: any) {
    return API_FetchConversations().then(
      success => {
        // debugger;
        dispatch(fetchConversations_OnSuccess(success.data['conversations']));
      },
      error => {
        // debugger;
        dispatch(fetchConversations_OnError(error))
      }
    );
  };
}

export default fetchConversations;
export {FETCH_CONVERSATIONS, FETCH_CONVERSATIONS_ERROR};
