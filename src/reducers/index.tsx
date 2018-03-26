import { combineReducers } from 'redux';
import visibilityFilter from './visibilityFilter';
import books from './reducer_book';
import activeBook from './reducer_activeBook';
import contacts from './reducer_contacts';

const rootReducer = combineReducers({
  visibilityFilter,
  books,
  activeBook,
  contacts
})

export default rootReducer;
