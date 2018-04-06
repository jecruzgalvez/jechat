import { NEW_CONVERSATION }     from '../actions/act_conv_newConversation';
import { FETCH_CONVERSATIONS }  from '../actions/act_conv_fetchConversations';
import { SELECT_CONVERSATION }  from '../actions/act_conv_selectConversation';

const initialState = {
  all: [],
  currentConversation: ''  
}


export default function(state = initialState, action: any) {
  // debugger
  switch (action.type) {

    case NEW_CONVERSATION:
      return {
        ...state,
        all: action.payload
      }
      
    case FETCH_CONVERSATIONS:
      return {
        ...state,
        all: action.payload
      }

      case SELECT_CONVERSATION:
      // debugger
      return {
        ...state,
        currentConversation: action.currentConversation
      }

      default:
      return state;
      
  }
}