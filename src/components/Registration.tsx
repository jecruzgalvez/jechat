import * as React from 'react';
import { Redirect } from 'react-router';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Alert, Button, Jumbotron, Form, FormGroup, FormControl, Col, HelpBlock } from 'react-bootstrap';

interface RegisterState {
  inputUserName: string;
  inputUserNameError: boolean;
  inputEmail: string;
  inputEmailError: boolean;
  inputPassword: string;
  inputPasswordError: boolean;
  inputPasswordConfirmation: string;
  inputPasswordConfirmationError: boolean;
  registerSuccessful: boolean;
  existingUser: boolean;
}

class Registration extends React.Component <{}, RegisterState> {
  constructor(props: {}) {
    super(props);
    
    this.state = {
      inputUserName: '',
      inputUserNameError: false,
      inputEmail: 'a@gmail.com',
      inputEmailError: false,
      inputPassword: '',
      inputPasswordError: false,
      inputPasswordConfirmation: '',
      inputPasswordConfirmationError: false,
      registerSuccessful: false,
      existingUser: false
    };
    
    this.handleInputUserName = this.handleInputUserName.bind(this);
    this.validateInputUserName = this.validateInputUserName.bind(this);   
    this.userNameGetValidationState = this.userNameGetValidationState.bind(this);

    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.validateInputEmail = this.validateInputEmail.bind(this);
    this.emailGetValidationState = this.emailGetValidationState.bind(this);

    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.validateInputPassword = this.validateInputPassword.bind(this);
    this.passwordGetValidationState = this.passwordGetValidationState.bind(this);

    this.handleInputPasswordConfirmation = this.handleInputPasswordConfirmation.bind(this);
    this.validateInputPasswordConfirmation = this.validateInputPasswordConfirmation.bind(this);
    this.passwordConfirmationGetValidationState = this.passwordConfirmationGetValidationState.bind(this);

    this.handleTryAgain = this.handleTryAgain.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  handleInputUserName(event: React.ChangeEvent <FormControl & HTMLInputElement>) {
    this.setState( {inputUserName: event.target.value});    
  }
  validateInputUserName() {
    // let userNameRegularExpression = /^[a-z ,.'-]+$/i;
    // if ( ! userNameRegularExpression.test(this.state.inputUserName) ) {
    //   this.setState({ inputUserNameError: true });
    // } else {
    //   this.setState({ inputUserNameError: false });
    // }

    if ( this.state.inputUserName.length === 0 ) {
      this.setState({ inputUserNameError: true });
    } else {
      this.setState({ inputUserNameError: false });
    }   
  }
  userNameGetValidationState() {
    if ( this.state.inputUserNameError ) {
      return 'error';
    }
    return null;
  }
  
  handleInputEmail(event: React.ChangeEvent <FormControl & HTMLInputElement>) {
    this.setState( {inputEmail: event.target.value});
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
  
  handleInputPasswordConfirmation(event: React.ChangeEvent <FormControl & HTMLInputElement>) {
    this.setState( {inputPasswordConfirmation: event.target.value});
  }
  validateInputPasswordConfirmation() {
    if ( this.state.inputPassword != this.state.inputPasswordConfirmation) {
      this.setState({inputPasswordConfirmationError: true});
    } else {
      this.setState({inputPasswordConfirmationError: false});
    }
  }
  passwordConfirmationGetValidationState() {
    if ( this.state.inputPasswordConfirmationError ) {
      return 'error';
    }
    return null;
  }

  handleSubmit(event: React.MouseEvent <FormControl & HTMLInputElement>) {
    if ( this.state.inputUserNameError ||
         this.state.inputEmailError ||
         this.state.inputPasswordError ||
         this.state.inputPasswordConfirmationError ||
        
         this.state.inputPassword.length === 0 ||
         this.state.inputPasswordConfirmation.length === 0
        ) {
            // console.log('Cant continue with form errors');
    } else {

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
    }  
    event.preventDefault();
  }

  handleTryAgain() {
    this.setState({
      inputUserName: '',
      inputEmail: 'a@gmail.com',
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

        <Form horizontal={true} >

          <FormGroup
            controlId="formHorizontalUserName"
            validationState={this.userNameGetValidationState()}
          >
            <Col  sm={2}>
              User name
            </Col>
            <Col sm={4}>
              <FormControl
                  type="text"
                  value={this.state.inputUserName}
                  placeholder="Your real name"
                  onChange={this.handleInputUserName}
                  onBlur={this.validateInputUserName}
              />
            </Col>
            <Col sm={6}>
              {this.state.inputUserNameError ?
                  <HelpBlock>User name can not be empty.</HelpBlock>
                  :
                  <HelpBlock />
                }
            </Col>

          </FormGroup>

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
                  placeholder="a@gmail.com"
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

          <FormGroup
            controlId="formHorizontalPasswordConfirmation"
            validationState={this.passwordConfirmationGetValidationState()}
          >
            <Col  sm={2}>
              Password confirmation
            </Col>
            <Col sm={4}>
              <FormControl
                type="password"
                value={this.state.inputPasswordConfirmation}
                placeholder="********"
                onChange={this.handleInputPasswordConfirmation}
                onBlur={this.validateInputPasswordConfirmation}
              />
            </Col>
            <Col sm={6}>
              { this.state.inputPasswordConfirmationError ?
                <HelpBlock>Passwords do not match.</HelpBlock>
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
                Register
              </Button>
            </Col>
          </FormGroup>
          </Form>

      </Jumbotron>
    );
  }
}

export default Registration;
