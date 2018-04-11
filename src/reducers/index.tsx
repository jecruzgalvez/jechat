import { combineReducers } from 'redux';

import visibilityFilter  from './red_visibilityFilter';
import friends           from './red_friends';
import users             from './red_users';
import conversations     from './red_conversations';
import messages          from './red_messages';

const appReducer = combineReducers({
  visibilityFilter,
  friends,
  users,
  conversations,
  messages
})

const rootReducer = (state:any , action: any) => {
  if(action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;
