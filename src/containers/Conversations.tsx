import * as React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { fetchConversations, selectConversation, fetchMessages } from "../actions/index";

interface ConversationsProps {
  friends: {_id: string, firstName: string}[];
  conversations: any;
  fetchConversations: () => void;
  selectConversation: (currentConverstion: any) => void;
  fetchMessages: (conversationId: any) => void;
}

class Conversations extends React.Component <ConversationsProps, {}> {
  constructor(props: ConversationsProps) {
    super(props);
    this.handleClickListGroup = this.handleClickListGroup.bind(this);
  }

  componentDidMount() {
    this.props.fetchConversations();
    // debugger
  }

  handleClickListGroup(event: React.MouseEvent <ListGroupItem & HTMLLIElement>) {
    this.props.fetchMessages(event.currentTarget.dataset.id);
    this.props.selectConversation(event.currentTarget.dataset.id);
    // debugger
  }

  renderList() {
    // debugger
    return this.props.conversations.all.map((conv :any) => {
      // let participants = conv.participants.map( (participant) => {
      //   return '*****' + participant ;
      // })
      return (
        <ListGroupItem key={conv._id} onClick={this.handleClickListGroup} data-id={conv._id}>
          {conv._id}
          {/* {participants} */}
        </ListGroupItem>        
      );
    });
  }

  render() {
    return (
      <ListGroup>
          {this.renderList()}
      </ListGroup>
    );
  }
}

function mapStateToProps(state: any) {  
  // debugger
  return {
    friends: state.friends,
    conversations: state.conversations
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    fetchConversations: () => dispatch(fetchConversations()),
    selectConversation: (currentConverstion: string) => dispatch(selectConversation(currentConverstion)),
    fetchMessages: (conversationId: any) => dispatch(fetchMessages(conversationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
