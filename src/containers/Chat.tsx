import * as React from "react";
import { connect } from "react-redux";
import * as socketIoClient from 'socket.io-client';
import { Jumbotron, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { fetchUsers,  saveMessage, fetchMessages } from "../actions/index";

// var userNames: any;

interface ChatProps {
  allConversations: any;
  currentConversation: string;
  messages: any;  
  users: any;
  fetchUsers: () => void;
  saveMessage: (conversationId: any, body: any) => void;
  fetchMessages: (conversationId: any) => void;
}

interface ChatState {
  response: string;
  endpoint: string;
  inputText: string;
}
// bitbucket

class Chat extends React.Component <ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      response: '',
      endpoint: 'http://127.0.0.1:3001',
      inputText: ''
    };
    this.handleSend = this.handleSend.bind(this);    
    // this.handleSendSubmit = this.handleSendSubmit.bind(this);
    // this.handleSendClick = this.handleSendClick.bind(this);    

    this.handleInputText = this.handleInputText.bind(this);
    this.showParticipants = this.showParticipants.bind(this);
  } 
  
  componentDidMount() {
    // this.props.fetchUsers();
    // userNames = new Map();
    // this.props.users.map( (user: any) => {
    //   // debugger
    //   userNames.set( hola, 'sssssaaaaa');
    // })

    const  socket: SocketIOClient.Socket = socketIoClient(this.state.endpoint);
    socket.on('new message', () => {
      this.props.fetchMessages(this.props.currentConversation);
    });
  }


  handleSend(event: any) {
    const  socket: SocketIOClient.Socket = socketIoClient(this.state.endpoint);

    event.preventDefault();
    socket.emit('new message', this.props.currentConversation, this.state.inputText);
    this.props.saveMessage(this.props.currentConversation, this.state.inputText);

    this.setState({inputText: ''});
  }
  // handleSendSubmit(event: React.FormEvent <HTMLFormElement>) {
  //   this.handleSend(event);
  // }
  // handleSendClick(event: React.MouseEvent <FormControl & HTMLInputElement>) {    
  //   this.handleSend(event);
  // }

  handleInputText(event: React.ChangeEvent <HTMLInputElement>) {
    this.setState({inputText: event.target.value});    
  }

  showParticipants() {
    return this.props.allConversations.map((conv: any ) => {
      let participants
      if(conv._id == this.props.currentConversation) {
        participants = conv.participants.map( (name: string) => {
          return name + '  ';
        });
      }      
      return participants;
    });    
  }

  renderList() {
    return this.props.messages.map((message: any) => {
      return (
        <ListGroupItem key={message._id}>
          {message.body}
        </ListGroupItem>        
      );
    });
  }

  render() {
    return (
      <div>
        { this.props.currentConversation?
          <Jumbotron className="w-100 h-100">
            <h3>{this.showParticipants()}</h3>
            
            <form onSubmit={this.handleSend}>
                <div>
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
                <Button
                  onClick={this.handleSend}
                >
                  Send
                </Button>
            </form>
          </Jumbotron>
        :
          <div>Please select a conversation.</div>
      }
      </div>
     
    );
  }
}

function mapStateToProps(state: any) { 
  // debugger
  return {
    users: state.users,
    allConversations: state.conversations.all,
    currentConversation: state.conversations.currentConversation,
    messages: state.messages
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    saveMessage: (conversationId: any, body: any) => dispatch(saveMessage(conversationId, body)),
    fetchMessages: (conversationId: string) => dispatch(fetchMessages(conversationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
