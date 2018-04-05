import * as React from "react";
import { connect } from "react-redux";
// import axios from 'axios';
import * as io from 'socket.io-client';
import { Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import { saveMessage, fetchMessages } from "../actions/index";

var socket: SocketIOClient.Socket;

interface ChatProps {
  conversations: any;
  messages: any;
  saveMessage: (conversationId: any, body: any) => void;
  fetchMessages: (conversationId: any) => void;
}

interface ChatState {
  response: string;
  endpoint: string;
  inputText: string;
}
// bitbucket

interface DataResponse {
  response: string;
}

class Chat extends React.Component <ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      response: '',
      endpoint: 'http://127.0.0.1:3001',
      inputText: ''
    };
    // this.handleSend = this.handleSend.bind(this);
    this.handleSend2 = this.handleSend2.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
  }
  
  componentDidMount() {
    socket = io(this.state.endpoint);
    
    socket.on('chat message', (data: DataResponse) => {
      this.setState({ response : this.state.response + '     ' + data.response });
    });
  }

  // handleSend(event: React.MouseEvent <HTMLInputElement>) {
  //   event.preventDefault();
  //   socket.emit('chat message', this.state.inputText);
  //   this.setState({inputText: ''});
  // }

  handleSend2(event: React.MouseEvent <HTMLInputElement>) {
    event.preventDefault();
    this.setState({inputText: ''});
    // debugger
    this.props.saveMessage(this.props.conversations.currentConversation, this.state.inputText);
    this.props.fetchMessages(this.props.conversations.currentConversation);
  }

  handleInputText(event: React.ChangeEvent <HTMLInputElement>) {
    this.setState({inputText: event.target.value});    
  }

  renderList() {
    return this.props.messages.map((message: any) => {
      // let participants = conv.participants.map( (participant) => {
      //   return '*****' + participant ;
      // })
      return (
        <ListGroupItem key={message._id}>
          {message.body}
          {/* {participants} */}
        </ListGroupItem>        
      );
    });
  }

  render() {
    return (
      <Jumbotron className="w-100 h-100">
        Participants: Contact 1, Contact2
        <form>          
          <div>
            {/* <textarea
              cols={30}
              rows={10}
              value={this.state.response}
            />             */}
            <ListGroup>
              {this.renderList()}
            </ListGroup>

          </div>
          <br/>
          <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputText}
          />
          <button
            onClick={this.handleSend2}
          >
            Send
          </button>
        </form>
      </Jumbotron>
    );
  }
}

function mapStateToProps(state: any) {  
  return {
    conversations: state.conversations,
    messages: state.messages
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    // fetchConversations: () => dispatch(fetchConversations()),
    saveMessage: (conversationId: any, body: any) => dispatch(saveMessage(conversationId, body)),
    fetchMessages: (conversationId: string) => dispatch(fetchMessages(conversationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
