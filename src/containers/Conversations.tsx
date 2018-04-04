import * as React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchConversations, fetchMessages } from "../actions/index";

interface ConversationsProps {
  friends: {_id: string, firstName: string}[];
  conversations: {_id: string, participants: string[]}[];
  fetchConversations: () => void;
  fetchMessages: (conversationId: any) => void;
}

class Conversations extends React.Component <ConversationsProps, {}> {
  constructor(props: ConversationsProps) {
    super(props);
    this.handleClickListGroup = this.handleClickListGroup.bind(this);
  }

  componentWillMount() {
    this.props.fetchConversations();
    // debugger
  }

  handleClickListGroup(event: React.MouseEvent <ListGroupItem & HTMLLIElement>) {
    console.log(event.currentTarget.dataset.id);
    this.props.fetchMessages(event.currentTarget.dataset.id)
  }

  renderList() {
    return this.props.conversations.map((conv ) => {
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
  return {
    friends: state.friends,
    conversations: state.conversations
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    fetchConversations: () => dispatch(fetchConversations()),
    fetchMessages: (conversationId: any) => dispatch(fetchMessages(conversationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
