interface actionType {  
   type: string;
   filter: string;  
}

const visibilityFilter = (state = 'ASCENDING', action: actionType) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

export default visibilityFilter;
