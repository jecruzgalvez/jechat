import * as React from 'react';
import { Redirect } from 'react-router';

import { Alert, Button, Jumbotron, Form, FormGroup, HelpBlock, FormControl, Col } from 'react-bootstrap';

interface LoginState {
  inputEmail: string;
  inputEmailError: boolean;
  inputPassword: string;
  inputPasswordError: boolean;
  loggedIn: boolean;
  loginFailed: boolean;
  clickedRegister: boolean;
}

class Login extends React.Component <{}, LoginState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      inputEmail: 'jcruz@tekmexico.com',
      inputEmailError: false,
      inputPassword: '',
      inputPasswordError: false,
      loggedIn: false,
      loginFailed: false,
      clickedRegister: false
    };

    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.validateInputEmail = this.validateInputEmail.bind(this);
    this.emailGetValidationState = this.emailGetValidationState.bind(this);

    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.validateInputPassword = this.validateInputPassword.bind(this);
    this.passwordGetValidationState = this.passwordGetValidationState.bind(this);

    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleTryAgain = this.handleTryAgain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputEmail(event: React.ChangeEvent <FormControl & HTMLInputElement>) {
    // let x = event as any as React.ChangeEvent <HTMLInputElement>;
    // this.setState( {inputPassword: event.currentTarget.value});
    this.setState({inputEmail: event.target.value});
  }
  validateInputEmail() {
    let emailRegularExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if ( ! emailRegularExpression.test(this.state.inputEmail) ) {
      this.setState({ inputEmailError: true });
    } else {
      this.setState({ inputEmailError: false });
    }
  }
  emailGetValidationState() {
    if ( this.state.inputEmailError ) {
      return 'error';
    }
    return null;
  }

  handleInputPassword(event: React.ChangeEvent <FormControl & HTMLInputElement>) {
    // let x = event as any as React.ChangeEvent <HTMLInputElement>;    
    // this.setState( {inputPassword: event.currentTarget.value});
    this.setState( {inputPassword: event.target.value});
  }
  validateInputPassword() {
    if ( this.state.inputPassword.length < 3 || this.state.inputPassword.length > 5) {
      this.setState({inputPasswordError: true});
    } else {
      this.setState({inputPasswordError: false});
    }
  }
  passwordGetValidationState() {
    if ( this.state.inputPasswordError ) {
      return 'error';
    }
    return null;
  }

  handleSubmit(event: React.MouseEvent <FormControl> ) {
    if ( this.state.inputEmailError || this.state.inputPasswordError) {
      // console.log('Cant continue with form errors');
    } else {
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
        if (res.response === 'success') {
          this.setState({loggedIn: true});
        } else {
          this.setState({
            inputEmail: 'jcruz@tekmexico.com',
            inputEmailError: false,
            inputPassword: '',
            inputPasswordError: false,
            loggedIn: false,
            loginFailed: true,
            clickedRegister: false
          });
        }          
      });    
    }
    event.preventDefault();
  }

  handleRegistration() {
    this.setState({clickedRegister: true});
  }

  handleTryAgain() {
    this.setState({
      inputEmail: 'jcruz@tekmexico.com',
      inputEmailError: false,
      inputPassword: '',
      inputPasswordError: false,
      loggedIn: false,
      loginFailed: false,
      clickedRegister: false
    });
  }

  render() {
    if (this.state.loggedIn) {
      return(
        <Redirect to="/dashboard" />
      );
    }

    if (this.state.clickedRegister) {
      return(
        <Redirect to="/registration" />
      );
    }

    if (this.state.loginFailed) {
      return (
        <Alert bsStyle="danger">
          <h2>Login failed!</h2>
          <Button 
            bsStyle="primary"

            onClick={this.handleTryAgain}
          >
            Try again
          </Button>

          <span> or </span>

          <Button
            bsStyle="primary"
            onClick={this.handleRegistration}
          >
            Register
          </Button>
        </Alert>
      );
    }

    return (
      <Jumbotron  className="w-100 h-100">
        <Form horizontal={true} >

          <FormGroup
            controlId="formHorizontalEmail"
            validationState={this.emailGetValidationState()}
          >
            <Col  sm={2}>
              Email
            </Col>
            <Col sm={4}>
              <FormControl
                  type="text"
                  value={this.state.inputEmail}
                  placeholder="jcruz@tekmexico.com"
                  onChange={this.handleInputEmail}
                  onBlur={this.validateInputEmail}
              />
            </Col>
            <Col sm={6}>
              {this.state.inputEmailError ?
                  <HelpBlock>Please enter a valid e-mail address.</HelpBlock>
                  :
                  <HelpBlock />
                }
            </Col>

          </FormGroup>

          <FormGroup
            controlId="formHorizontalPassword"
            validationState={this.passwordGetValidationState()}
          >
            <Col  sm={2}>
              Password
            </Col>
            <Col sm={4}>
              <FormControl
                type="password"
                value={this.state.inputPassword}
                placeholder="********"
                onChange={this.handleInputPassword}
                onBlur={this.validateInputPassword}
              />
            </Col>
            <Col sm={6}>
              { this.state.inputPasswordError ?
                <HelpBlock>Your password needs to be between 3 and 5 characters long.</HelpBlock>
                :
                <HelpBlock/>
            }
            </Col>
          </FormGroup>
          
          <FormGroup>
            <Col smOffset={2} sm={5}>
              <Button
                type="submit"
                onClick={this.handleSubmit}
              >
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }
}

export default Login;
