import * as React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router';
import { Alert, Button, Jumbotron, Form, FormGroup, HelpBlock, FormControl, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

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
      inputEmail: 'e@gmail.com',
      inputEmailError: false,
      inputPassword: 'eee',
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
    } else 
    {
      axios.get('/api/login',{
          params: {
            email: this.state.inputEmail,
            password: this.state.inputPassword
          }
      })
      .then( (response: any) => {
        // console.log('response: ',response);
        
        if (response.data.response === 'success') {
          this.setState({loggedIn: true});
        } else {
          this.setState({
            inputEmail: 'a@gmail.com',
            inputEmailError: false,
            inputPassword: '',
            inputPasswordError: false,
            loggedIn: false,
            loginFailed: true,
            clickedRegister: false
          });
        }
      })
      .catch( (error: any) => {
        // console.error('Error:', error);
      });
    }
    event.preventDefault();
  }

  handleRegistration() {
    this.setState({clickedRegister: true});
  }

  handleTryAgain() {
    this.setState({
      inputEmail: 'a@gmail.com',
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
          <h2>
            <FormattedMessage
              id="login.loginFailed"
              defaultMessage= "Login failed!"
            />
          </h2>
          <Button 
            bsStyle="primary"
            onClick={this.handleTryAgain}
          >
            <FormattedMessage
              id="login.tryAgain"
              defaultMessage= "Try again"
            />
          </Button>

          <span>
            <FormattedMessage
              id="login.or"
              defaultMessage= " Or "
            />
          </span>

          <Button
            bsStyle="primary"
            onClick={this.handleRegistration}
          >
            <FormattedMessage
              id="login.register"
              defaultMessage= "Register"
            />
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
              <FormattedMessage
                id="login.email"
                defaultMessage= "Email"
              />
              
            </Col>
            <Col sm={4}>
              <FormControl
                  type="text"
                  value={this.state.inputEmail}
                  placeholder="a@gmail.com"
                  onChange={this.handleInputEmail}
                  onBlur={this.validateInputEmail}
              />
            </Col>
            <Col sm={6}>
              {this.state.inputEmailError ?
                  <HelpBlock>
                    <FormattedMessage
                      id="login.enterValidEmail"
                      defaultMessage= "Please enter a valid e-mail address."
                    />
                  </HelpBlock>
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
              <FormattedMessage
                id="login.password"
                defaultMessage= "Password"
              />
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
                <HelpBlock>
                  <FormattedMessage
                    id="login.passwordBetween3And5"
                    defaultMessage= "Your password needs to be between 3 and 5 characters long."
                  />
                </HelpBlock>
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
                <FormattedMessage
                  id="login.signIn"
                  defaultMessage= "Sign in"
                />
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }
}

export default Login;
