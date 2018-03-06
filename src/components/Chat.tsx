import * as React from 'react';

// import * as ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import Counter from './components/counter';
// import counter from './reducers/reducers';

// const store = createStore <number> (counter);

// export default class App extends React.Component {
//   render() {
//     return(
//       <Counter
//         value={store.getState()}
//         onIncrement={() => store.dispatch({type: 'INCREMENT'})}
//         onDecrement={() => store.dispatch({type: 'DECREMENT'})}
//       />
//     );
//   }
// }

// render();
// store.subscribe(App.render);

import * as io from 'socket.io-client';

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
      endpoint: 'http://127.0.0.1:4001',
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
      <div>
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
      </div>
    );
  }
}

export default Chat;