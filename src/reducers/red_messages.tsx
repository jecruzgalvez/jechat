import { SAVE_MESSAGE }   from '../actions/act_mess_saveMessage';
import { FETCH_MESSAGES } from '../actions/act_mess_fetchMessages';

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
