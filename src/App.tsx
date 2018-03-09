import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { ButtonGroup, Button } from 'react-bootstrap';

import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

const App = () => (
  <Router>    
    <div>
      <ButtonGroup>
        <Button bsStyle="link">
          <Link to="/login">Login</Link>
        </Button>
        <Button bsStyle="link">
          <Link to="/register">Register</Link>
        </Button>
        <Button bsStyle="link">
          <Link to="/chat">Chat</Link>
        </Button>
      </ButtonGroup>     

      <Route
        exact={true}
        path="/login"
        component={Login}        
      />
      <Route
        path="/register"
        component={Register}
      />
      <Route
        path="/chat"
        component={Chat}
      />
    </div>
  </Router>
);

export default App;

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
