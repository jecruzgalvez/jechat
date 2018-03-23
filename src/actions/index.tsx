// let nextTodoId = 0
// export const addTodo = (text) => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })

export const setVisibilityFilter = (filter: string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

// export const toggleTodo = (id) => ({
//   type: 'TOGGLE_TODO',
//   id
// })

export function selectBook(book: any ) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: "BOOK_SELECTED",
    payload: book
  };
}
