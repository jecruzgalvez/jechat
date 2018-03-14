import * as React from 'react';
import { Redirect } from 'react-router';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Alert, Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';

interface RegisterState {
  inputUserName?: string;
  inputEmail?: string;
  inputPassword?: string;
  inputPasswordConfirmation?: string;
  registerSuccessful: boolean;
  existingUser: boolean;
}

class Registration extends React.Component <{}, RegisterState> {
  constructor(props: {}) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputUserName = this.handleInputUserName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleInputPasswordConfirmation = this.handleInputPasswordConfirmation.bind(this);
    this.handleTryAgain = this.handleTryAgain.bind(this);

    this.state = {
      inputUserName: '',
      inputEmail: 'jcruz@tekmexico.com',
      inputPassword: '',
      inputPasswordConfirmation: '',
      registerSuccessful: false,
      existingUser: false
    };
  }

  handleInputUserName(event: React.ChangeEvent <HTMLInputElement>) {
    this.setState( {inputUserName: event.target.value});    
  }
  handleInputEmail(event: React.ChangeEvent <HTMLInputElement>) {
    this.setState( {inputEmail: event.target.value});
  }
  handleInputPassword(event: React.ChangeEvent <HTMLInputElement>) {
    this.setState( {inputPassword: event.target.value});
  }
  handleInputPasswordConfirmation(event: React.ChangeEvent <HTMLInputElement>) {
    this.setState( {inputPasswordConfirmation: event.target.value});
  }
  handleSubmit(event: React.MouseEvent <HTMLInputElement>) {
    let url = '/registration';
    let data = {
      userName: this.state.inputUserName,
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
      if (res.response === 'success') {
        // console.log("SUCCESS ", res.existingEmail);
        this.setState({registerSuccessful: true});
      } else {
        // console.log('FAIL ', res.existingEmail);
        this.setState({existingUser: true});

      }
    });
    
    event.preventDefault();
  }

  handleTryAgain() {
    this.setState({
      inputUserName: '',
      inputEmail: 'jcruz@tekmexico.com',
      inputPassword: '',
      inputPasswordConfirmation: '',
      registerSuccessful: false,
      existingUser: false
    });
  }

  render() {
    if (this.state.registerSuccessful) {
      return(
        <Redirect to="/login" />
      );
    }

    if (this.state.existingUser) {
      return (
        <Alert bsStyle="warning">
          <h4>A user with the same email already exists </h4>
          <Button 
            bsStyle="primary"

            onClick={this.handleTryAgain}
          >
            Try again
          </Button>
        </Alert>
      );
    }

    return (
      <Jumbotron>
        <form>
        <Grid>
        <h4>Please fill the following fields</h4>
            <Row className="show-grid">
              <Col xs={6} md={2} className="border text-left">
                User name
              </Col>
              <Col xs={6} md={10} className="border text-left">
                <input
                  type="userName"
                  onChange={this.handleInputUserName}
                  placeholder="User Name"
                  value={this.state.inputUserName}
                />
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={2} className="border text-left">
                Email
              </Col>
              <Col xs={6} md={10} className="border text-left">
                <input
                  type="email"
                  onChange={this.handleInputEmail}
                  placeholder="jcruz@tekmexico.com"
                  value={this.state.inputEmail}
                />
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={2} className="border text-left">
                Password
              </Col>
              <Col xs={6} md={10} className="border text-left">
                <input
                  type="text"
                  onChange={this.handleInputPassword}
                  value={this.state.inputPassword}
                />
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={2} className="border text-left">
                Confirmation
              </Col>
              <Col xs={6} md={10} className="border text-left">
                <input
                  type="text"
                  onChange={this.handleInputPasswordConfirmation}
                  value={this.state.inputPasswordConfirmation}
                />
              </Col>
            </Row>

            <Row className="show-grid">            
              <Col xs={6} md={2} className="border" />
              <Col xs={6} md={10} className="border text-left">
                <input
                  type="submit"
                  onClick={this.handleSubmit}
                  value="Register"
                />
              </Col>
            </Row>
              
        </Grid>
        </form>
      </Jumbotron>
    );
  }
}

export default Registration;
