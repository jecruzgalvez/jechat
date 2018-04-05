import axios from 'axios';

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
  debugger
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
const saveMessage = (conversationId: any, body: any) => {
  return function (dispatch: any) {
    return API_SaveMessage(conversationId, body).then(
      success => {
        dispatch(saveMessage_OnSuccess(success.data['messages']));
      },
      error => {
        dispatch(saveMessage_OnError(error))
      }
    );
  };
}

export default saveMessage;
export {SAVE_MESSAGE, SAVE_MESSAGE_ERROR};