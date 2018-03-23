import { combineReducers } from 'redux';
// import todos from './todos'
import visibilityFilter from './visibilityFilter';
import books from './reducer_book';
import activeBook from './reducer_activeBook';

const todoApp = combineReducers({
  // todos,
  visibilityFilter,
  books,
  activeBook,
})

export default todoApp
