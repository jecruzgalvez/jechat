import * as React from 'react';
import * as io from 'socket.io-client';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Jumbotron } from 'react-bootstrap';

var socket: SocketIOClient.Socket;

interface ChatState {
  response: string;
  endpoint: string;
  inputText: string;
}
// bitbucket

interface DataResponse {
  response: string;
}

class Chat extends React.Component <{}, ChatState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      response: '',
      endpoint: 'http://127.0.0.1:3001',
      inputText: ''
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
  }
  
  componentDidMount() {
    socket = io(this.state.endpoint);
    
    socket.on('chat message', (data: DataResponse) => {
      this.setState({ response : this.state.response + '     ' + data.response });
    });
  }

  handleSend(event: React.MouseEvent <HTMLInputElement>) {
      socket.emit('chat message', this.state.inputText);
      this.setState({inputText: ''});
      event.preventDefault();     
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
            onClick={this.handleSend}
          >
            Send
          </button>
        </form>
      </Jumbotron>
    );
  }
}

export default Chat;
