import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

const App = () => (
  <Router>
    
    <div>

      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
        <Link to="/chat">Chat</Link>
        </li>
      </ul>

      <hr />

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
