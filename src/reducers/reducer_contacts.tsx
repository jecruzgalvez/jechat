// import { handleActions } from 'redux-actions';

// const FETCH_CONTACTS = "contacts/FETCH_CONTACTS";

// export default  {
//   getContactList: (contacts: any) => ({
//     type: FETCH_CONTACTS,
//     contacts
//   }),
//   reducer: handleActions({
//     [FETCH_CONTACTS]: (state: any, action: any) => ({
//       ...state,
//       all: action.movies
//     })
//   }, {
//     movies: [],
//     movie: {}
//   })
// }

export default function(state = [], action: {type: string, payload: {_id: string, userName: string}[]}) {  
  // debugger
  switch (action.type) {
    case "FETCH_CONTACTS":
      return action.payload;
    default:
      return state;
  }
}
