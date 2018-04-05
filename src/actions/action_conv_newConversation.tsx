import axios from 'axios';

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
const newConversation = (recipient: any) => {
  return function (dispatch: any) {
    return API_NewConversation(recipient).then(
      success => {
        // debugger
        dispatch(newConversation_OnSuccess(success.data['conversations']));
      },
      error => {
        dispatch(newConversation_OnError(error))
      }
    );
  };
}

export default newConversation;
export { NEW_CONVERSATION,  NEW_CONVERSATION_ERROR };
