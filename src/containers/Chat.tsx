import * as React from 'react';
import { connect } from 'react-redux';
import * as socketIoClient from 'socket.io-client';
import { Panel, Jumbotron, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';

import { fetchUsers,  saveMessage, fetchMessages } from '../actions/index';

interface ChatProps extends InjectedIntlProps {
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
  
  messagesEnd: any;

  componentDidMount() {
    this.props.fetchUsers();    

    const  socket: SocketIOClient.Socket = socketIoClient(this.state.endpoint);
    socket.on('new message', () => {
      this.props.fetchMessages(this.props.currentConversation);
    });

    this.messagesEnd = null;
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

  componentDidUpdate() {
   this.scrollToBottom();
  }

  scrollToBottom = () => {
    if(this.messagesEnd)
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  renderList() {
    return this.props.messages.map((message: any) => {
      let author: any;
      author = this.props.users.find((user: any) => {
        return message.author == user._id;
      })

      let date = this.props.intl.formatRelative(message.createdAt);
      // debugger
      return (
        <ListGroupItem key={message._id} header={`${author.firstName}, ${date}`} >
          {message.body}
        </ListGroupItem>
      );
    });
  }

  render() {
    return (
      <div>
        { this.props.currentConversation?
        
          <form onSubmit={this.handleSend}>

            <h3>{this.showParticipants()}</h3>

            <Panel style={{height: "45vh", overflow:"auto"}}>                          
                  <ListGroup >
                    {this.renderList()}
                  </ListGroup>

                  <div
                    style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                  </div>
            </Panel>

            <input
              type="text"
              value={this.state.inputText}
              onChange={this.handleInputText}
            />
            <Button
              onClick={this.handleSend}
            >
              <FormattedMessage
                id="chat.sendMessage"
                defaultMessage="Send message"
              />

              
            </Button>
            </form>                        
        :
          <Jumbotron className="w-100 h-100">
            <h3>
            <FormattedMessage
                id="chat.selectAConversation"
                defaultMessage="Please select a conversation."
              />
            </h3>
          </Jumbotron>
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Chat));
