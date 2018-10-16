//////////////////////////////    selectLanguage   //////////////////////////////
const SELECT_LANGUAGE = 'settings/SELECT_LANGUAGE';

function selectLanguage(language: string) {
  // debugger
  return {
    type: SELECT_LANGUAGE,
    language
  };
}

export default selectLanguage;
export { SELECT_LANGUAGE };