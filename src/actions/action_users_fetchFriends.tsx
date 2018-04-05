import axios from 'axios';

//////////////////////////////    fetchFriends   //////////////////////////////
const FETCH_FRIENDS       = 'friends/FETCH_FRIENDS';
const FETCH_FRIENDS_ERROR = 'friends/FETCH_FRIENDS_ERROR';
function API_FetchFriends() {
  return axios.get('/api/fetchFriends');
}
function fetchFriends_OnSuccess(success: {_id: string, firstName: string}[]) {
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
const fetchFriends = () => {  
  return function (dispatch: any) {
    return API_FetchFriends().then(
      success => {
        // console.log('friends==========> ',success.data['friends'])
        // debugger;
        dispatch(fetchFriends_OnSuccess(success.data['friends']));
      },
      error => {
        dispatch(fetchFriends_OnError(error))
      }
    );    
  };
}

export default fetchFriends;
export { FETCH_FRIENDS, FETCH_FRIENDS_ERROR };