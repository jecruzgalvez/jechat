const NEW_CONVERSATION       = 'conversation/NEW_CONVERSATION';
// const NEW_CONVERSATION_ERROR = 'conversation/NEW_CONVERSATION_ERROR';
const FETCH_CONVERSATIONS       = 'conversation/FETCH_CONVERSATION';
// const FETCH_CONVERSATIONS_ERROR = 'conversation/FETCH_CONVERSATION_ERROR';

export default function(state = [], action: {type: string, payload: {_id: string, userName: string}[]}) {
  switch (action.type) {

    case NEW_CONVERSATION:
      return action.payload;
      
    case FETCH_CONVERSATIONS:
      return action.payload;

      default:
      return state;
      
  }
}
