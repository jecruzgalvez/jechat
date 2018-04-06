import * as React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { fetchConversations, selectConversation, fetchMessages } from "../actions/index";

interface ConversationsProps {
  friends: {_id: string, firstName: string}[];
  allConversations: any;
  fetchConversations: () => void;
  selectConversation: (currentConversation: any) => void;
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
    return this.props.allConversations.map((conv: any ) => {
      let participants = conv.participants.map( (name: string) => {
        return name + '  ';
      })
      return (
        <ListGroupItem key={conv._id} onClick={this.handleClickListGroup} data-id={conv._id}>
          {/* {conv._id} */}
          {participants}
        </ListGroupItem>        
      );
    });
  }

  render() {
    // debugger
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
    allConversations: state.conversations.all
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    fetchConversations: () => dispatch(fetchConversations()),
    selectConversation: (currentConversation: string) => dispatch(selectConversation(currentConversation)),
    fetchMessages: (conversationId: any) => dispatch(fetchMessages(conversationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
