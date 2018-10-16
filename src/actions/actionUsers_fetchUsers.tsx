import axios from 'axios';

//////////////////////////////    fetchUsers   //////////////////////////////
const FETCH_USERS       = 'users/FETCH_USERS';
const FETCH_USERS_ERROR = 'users/FETCH_USERS_ERROR';
function API_FetchUsers() {
  return axios.get('/api/fetchUsers');
}
function fetchUsers_OnSuccess(success: {_id: string, firstName: string}[]) {
  return {
    type: FETCH_USERS,
    payload: success
  };
}
function fetchUsers_OnError(error: any) {
  return {
    type: FETCH_USERS_ERROR,
    error
  };
}
const fetchUsers = () => {  
  return function (dispatch: any) {
    return API_FetchUsers().then(
      success => {
        // console.log('users==========> ',success.data['users'])
        // debugger;
        dispatch(fetchUsers_OnSuccess(success.data['users']));
      },
      error => {
        dispatch(fetchUsers_OnError(error))
      }
    );    
  };
}

export default fetchUsers;
export { FETCH_USERS, FETCH_USERS_ERROR };