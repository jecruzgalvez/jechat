import { FETCH_FRIENDS } from '../actions/actionFriends_fetchFriends';

export default function(state = [], action: {type: string, payload: {_id: string, userName: string}[]}) {  
  // debugger
  switch (action.type) {
    case FETCH_FRIENDS:
      return action.payload;
    default:
      return state;
  }
}