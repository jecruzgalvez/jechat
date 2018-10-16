import { combineReducers } from 'redux';

import users             from './reducer_users';
import friends           from './reducer_friends';
import conversations     from './reducer_conversations';
import messages          from './reducer_messages';
import language          from './reducer_language'

const appReducer = combineReducers({  
  friends,
  users,
  conversations,
  messages,
  language
})

const rootReducer = (state:any , action: any) => {
  if(action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;
