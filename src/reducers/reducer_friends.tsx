const FETCH_FRIENDS       = 'friends/FETCH_FRIENDS';
// const FETCH_FRIENDS_ERROR = 'friends/FETCH_FRIENDS_ERROR';

export default function(state = [], action: {type: string, payload: {_id: string, userName: string}[]}) {  
  switch (action.type) {    
    case FETCH_FRIENDS:
      return action.payload;
    default:
      return state;
  }
}

// import { handleActions } from 'redux-actions'
// const FETCH_FRIENDS = "friends/FETCH_FRIENDS";

// export const friends = {
//   fetchFriendsActionCreator: (friends: any) => ({
//     type: FETCH_FRIENDS,
//     friends
//   }),
//   reducer: handleActions({
//     [FETCH_FRIENDS]: (state, action) => ({
//       ...state,
//       all: action.payload
//     })
//   }, {
//     friends: []
//   })
// }