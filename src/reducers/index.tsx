import { combineReducers } from 'redux';
import visibilityFilter from './visibilityFilter';
import friends from './reducer_friends';
import conversations from './reducer_conversations';
import messages from './reducer_messages';

const rootReducer = combineReducers({
  visibilityFilter,
  friends,
  conversations,
  messages
})

export default rootReducer;
