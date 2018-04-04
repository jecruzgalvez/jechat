import * as React from 'react';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';

class Logout extends React.Component {

  componentDidMount() {
    axios.get('/api/logout',{})
  }

  render() {
    return (
      <Jumbotron>
        Logout
      </Jumbotron>
    );
  }
}

export default Logout;