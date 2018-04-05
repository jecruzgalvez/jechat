//////////////////////////////    fetchConversations   //////////////////////////////
const SELECT_CONVERSATION       = 'conversation/SELECT_CONVERSATION';

function selectConversation(currentConversation: string) {
  // debugger
  return {
    type: SELECT_CONVERSATION,
    currentConversation
  };
}

export default selectConversation;
export { SELECT_CONVERSATION };