import { FETCH_USERS } from '../actions/actionUsers_fetchUsers';

export default function(state = [], action: {type: string, payload: {_id: string, userName: string}[]}) {  
  // debugger
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}