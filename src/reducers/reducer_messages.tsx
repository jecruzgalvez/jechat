const SAVE_MESSAGE       = 'messages/SAVE_MESSAGE';
// const SAVE_MESSAGE_ERROR = 'messages/SAVE_MESSAGE_ERROR';

const FETCH_MESSAGES       = 'messages/FETCH_MESSAGES';
// const FETCH_MESSAGES_ERROR = 'messages/FETCH_MESSAGES_ERROR';

export default function(state = [], action: any) {
  switch (action.type) {

    case SAVE_MESSAGE:
      return action.payload;

    case FETCH_MESSAGES:
      return action.payload;

    default:
      return state;
      
  }
}
