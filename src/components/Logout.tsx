import * as React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/index';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';

interface LogoutProps {
  logout: () => void;
}


class Logout extends React.Component <LogoutProps, {}> {
  constructor(props: LogoutProps){
    super(props);
  }
  

  componentDidMount() {
    axios.get('/api/logout',{});
    this.props.logout();   
  }

  render() {
    return (
      <Jumbotron>
        <h3>Good bye.</h3>        
      </Jumbotron>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null,mapDispatchToProps)(Logout);