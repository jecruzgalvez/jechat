import { SELECT_LANGUAGE }  from '../actions/actionSettings_selectLanguage';

const initialState = {
  language: 'en'
};

export default function(state = initialState, action: any) {
  // debugger
  switch (action.type) {
    
      case SELECT_LANGUAGE:
      // debugger
      return {
        language: action.language
      };

      default:
      return state;      
  }
}