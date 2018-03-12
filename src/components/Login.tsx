import * as React from 'react';
import { Redirect } from 'react-router';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Alert, Button, Jumbotron, Grid, Col, Row } from 'react-bootstrap';

interface LoginState {
  inputEmail?: string;
  inputPassword?: string;
  loggedIn: boolean;
  loginFailed: boolean;
  clickedRegister: boolean;
}

class Login extends React.Component <{}, LoginState> {
  constructor(props: {}) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleTryAgain = this.handleTryAgain.bind(this);
    
    this.state = {
      inputEmail: 'jcruz@tekmexico.com',
      inputPassword: '',
      loggedIn: false,
      loginFailed: false,
      clickedRegister: false
    }
  }

  handleInputEmail(event: React.ChangeEvent <HTMLInputElement>) {
    // console.log('Typed: ', event.target.value);
    this.setState( {inputEmail: event.target.value}); //.replace(/^[a-z]$/ig, '')
  }

  handleInputPassword(event: React.ChangeEvent <HTMLInputElement>) {
    // console.log('Typed: ', event.target.value);
    this.setState( {inputPassword: event.target.value});
  }

  handleSubmit(event : React.MouseEvent <HTMLInputElement> ) {
    let url = '/login';
    let data = {
      email: this.state.inputEmail,
      password: this.state.inputPassword
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(res => {      
      if(res.response === "success"){
        this.setState({loggedIn: true});
      }
      else
        this.setState({
          inputEmail: 'jcruz@tekmexico.com',
          inputPassword: '',
          loggedIn: false,
          loginFailed: true
        });
    });
    
    event.preventDefault();
  }

  handleRegister() {
    this.setState({clickedRegister: true});
  }

  handleTryAgain() {
    this.setState({
      inputEmail: 'jcruz@tekmexico.com',
      inputPassword: '',
      loggedIn: false,
      loginFailed: false,
      clickedRegister: false
    });
  }

  render() {
    if (this.state.loggedIn) {
      return(
        <Redirect to="/dashboard" />
      )
    }

    if(this.state.clickedRegister) {
      return(
        <Redirect to="/registration" />
      )
    }

    if(this.state.loginFailed) {
      return (
        <Alert bsStyle="warning">
          <h4>This user does not exist!</h4>
          <Button 
            bsStyle="primary"

            onClick={this.handleTryAgain}
          >
            Try again
          </Button>

          <span> or </span>

          <Button
            bsStyle="primary"
            onClick={this.handleRegister}
          >
            Register
          </Button>
        </Alert>
      )
    }

    return (
      <Jumbotron>
        <form>                
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={2} className="border text-left">
                Email
              </Col>
              <Col xs={6} md={10} className="border  text-left">
                <input
                  type="email"
                  onChange= {this.handleInputEmail}
                  placeholder="jcruz@tekmexico.com"
                  value= {this.state.inputEmail}              
                />
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={2} className="border text-left">
                Password
              </Col>
              <Col xs={6} md={10} className="border text-left">
                <input
                  type="password"
                  onChange= {this.handleInputPassword}
                  value= {this.state.inputPassword}
                  placeholder="******"
                />    
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={2} className="border">
                </Col>
              <Col xs={6} md={10} className="border text-left">
              <input
                type="submit"
                onClick={this.handleSubmit}
                value="Login"
              />
              </Col>
            </Row>

          </Grid>
        </form>       
      </Jumbotron>
    );
  }
}

export default Login;
