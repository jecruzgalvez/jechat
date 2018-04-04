import * as React from "react";
import { connect } from "react-redux";
// import axios from 'axios';
import * as io from 'socket.io-client';
import { Jumbotron } from 'react-bootstrap';
import { saveMessage } from "../actions/index";

var socket: SocketIOClient.Socket;

interface ChatProps {
  friends: {_id: string, firstName: string}[];
  conversations: {_id: string, participants: string[]}[];
  saveMessage: (conversationId: any, body: any) => void;
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
    this.handleSend = this.handleSend.bind(this);
    this.handleSend2 = this.handleSend2.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
  }
  
  componentDidMount() {
    socket = io(this.state.endpoint);
    
    socket.on('chat message', (data: DataResponse) => {
      this.setState({ response : this.state.response + '     ' + data.response });
    });
  }

  handleSend(event: React.MouseEvent <HTMLInputElement>) {
    event.preventDefault();
    socket.emit('chat message', this.state.inputText);
    this.setState({inputText: ''});
  }

  handleSend2(event: React.MouseEvent <HTMLInputElement>) {
    event.preventDefault();
    this.setState({inputText: ''});    
    this.props.saveMessage('5ac50968d6a9d71d043294dc', this.state.inputText);
  }

  handleInputText(event: React.ChangeEvent <HTMLInputElement>) {
    this.setState({inputText: event.target.value});    
  }

  render() {
    return (
      <Jumbotron className="w-100 h-100">
        Participants: Contact 1, Contact2
        <form>          
          <div>
            <textarea
              cols={30}
              rows={10}
              value={this.state.response}
            />            
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
    friends: state.friends,
    conversations: state.conversations
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    // fetchConversations: () => dispatch(fetchConversations()),
    saveMessage: (conversationId: any, body: any) => dispatch(saveMessage(conversationId, body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
