import * as React from 'react';
import * as io from 'socket.io-client';

interface AppState {
  response: string;
  endpoint: string;
  // socket?: SocketIOClient.Socket;
  inputText: string;
}

interface DataResponse {
  response: string;
}

var socket;

class App extends React.Component <{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      response: 'No messages yet',
      endpoint: 'http://127.0.0.1:4001',
      inputText: ''
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
  }
  
  componentDidMount() {
    // this.setState({ socket: io(this.state.endpoint) });
    // if( this.state.socket ) {
    //   this.state.socket.on('chat message', (data: DataResponse) => {
    //       this.setState({ response : data.response });
    //       console.log('data.response');
    //     }
    //   );
    // }

    socket = io(this.state.endpoint);
    
    socket.on('chat message', (data: DataResponse) => {
          this.setState({ response : data.response });
          console.log('data.response');
        }
      );
  }

  handleSend() {
    // if( this.state.socket ) {
      // socket.emit('chat message', this.state.inputText);
      this.setState({inputText: ''});      
    // }
  }

  handleInputText(event: React.ChangeEvent <HTMLInputElement>) {
    console.log(event.target.value);
    this.setState({inputText: event.target.value});    
  }

  render() {
    return (
      <div>
        <form>          
          <div>
            <textarea
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
      </div>
    );
  }
}

export default App;
