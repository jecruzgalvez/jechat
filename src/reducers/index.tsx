import { combineReducers } from 'redux';
// import todos from './todos'
import visibilityFilter from './visibilityFilter';
import books from './reducer_book';
import activeBook from './reducer_activeBook';
import contacts from './reducer_contacts';

const todoApp = combineReducers({
  // todos,
  visibilityFilter,
  books,
  activeBook,
  contacts
})

export default todoApp
