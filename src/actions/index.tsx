import axios from 'axios';

export const setVisibilityFilter = (filter: string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export function selectBook(book: any ) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: "BOOK_SELECTED",
    payload: book
  };
}

/////////////////////////////////////////////////////////////////////

function apiFetchContactsList() {
  // let url = '/apiFetchContactsList';
  // let data = {
  //   email: 'e@gmail.com'
  // };
  // return fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: new Headers({
  //     'Content-Type': 'application/json'
  //   })
  // })

  return axios.get('/api/fetchContacts',{})

  // .then( (response: any) => {
  //   console.log('response: ',response);    
  // })
  // .catch( (error: any) => {
  //   console.error('Error:', error);
  // });
}
function fetchContactsListOnSuccess(success: {_id: string, userName: string}[]) {
  return {
    type: 'FETCH_CONTACTS',
    payload: success
  };
}
function fetchContactsListOnError(error: any) {
  return {
    type: 'FETCH_CONTACTS_ERROR',
    error
  };
}
export function fetchContactsList() {
  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.
  return function (dispatch: any) {
    return apiFetchContactsList().then(
      success => {
        // debugger;
        dispatch(fetchContactsListOnSuccess(success.data['friends']));
      },
      error => dispatch(fetchContactsListOnError(error))
    );
  };
}
