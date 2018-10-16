import axios from 'axios';

//////////////////////////////    newConversation   //////////////////////////////
const NEW_FRIEND       = 'friends/NEW_FRIEND';
const NEW_FRIEND_ERROR = 'friends/NEW_FRIEND_ERROR';
function API_NewFriend(newFriendId: any) {
  return axios.get('/api/newFriend', {
    params: {
      newFriendId
    }
  });
}
function newFriend_OnSuccess(success: {_id: string, userName: string}[]) {
  return {
    type: NEW_FRIEND,
    payload: success
  };
}
function newFriend_OnError(error: any) {
  return {
    type: NEW_FRIEND_ERROR,
    error
  };
}
const newFriend = (newFriendId: any) => {
  return function (dispatch: any) {
    return API_NewFriend(newFriendId).then(
      success => {
        debugger
        if(success.data['friends'])
          dispatch(newFriend_OnSuccess(success.data['friends']));
      },
      error => {
        dispatch(newFriend_OnError(error))
      }
    );
  };
}

export default newFriend;
export { NEW_FRIEND,  NEW_FRIEND_ERROR };
