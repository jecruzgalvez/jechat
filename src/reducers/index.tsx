import { combineReducers } from 'redux';

import visibilityFilter  from './red_visibilityFilter';
import friends           from './red_friends';
import users             from './red_users';
import conversations     from './red_conversations';
import messages          from './red_messages';

const rootReducer = combineReducers({
  visibilityFilter,
  friends,
  users,
  conversations,
  messages
})

export default rootReducer;
