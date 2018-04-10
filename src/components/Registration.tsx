import * as React from 'react';
import { Redirect } from 'react-router';
import { Alert, Button, Jumbotron, Form, FormGroup, FormControl, Col, HelpBlock } from 'react-bootstrap';
import axios from 'axios';


interface RegisterState {
  inputFirstName: string;
  inputFirstNameError: boolean;
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
      inputFirstName: '',
      inputFirstNameError: false,
      inputEmail: 'a@gmail.com',
      inputEmailError: false,
      inputPassword: '',
      inputPasswordError: false,
      inputPasswordConfirmation: '',
      inputPasswordConfirmationError: false,
      registerSuccessful: false,
      existingUser: false
    };
    
    this.handleInputFirstName = this.handleInputFirstName.bind(this);
    this.validateInputFirstName = this.validateInputFirstName.bind(this);   
    this.firstNameGetValidationState = this.firstNameGetValidationState.bind(this);

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

  handleInputFirstName(event: React.ChangeEvent <FormControl & HTMLInputElement>) {
    this.setState( {inputFirstName: event.target.value});    
  }
  validateInputFirstName() {
    // let firstNameRegularExpression = /^[a-z ,.'-]+$/i;
    // if ( ! firstNameRegularExpression.test(this.state.inputFirstName) ) {
    //   this.setState({ inputFirstNameError: true });
    // } else {
    //   this.setState({ inputFirstNameError: false });
    // }

    if ( this.state.inputFirstName.length === 0 ) {
      this.setState({ inputFirstNameError: true });
    } else {
      this.setState({ inputFirstNameError: false });
    }   
  }
  firstNameGetValidationState() {
    if ( this.state.inputFirstNameError ) {
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
    if ( this.state.inputFirstNameError ||
         this.state.inputEmailError ||
         this.state.inputPasswordError ||
         this.state.inputPasswordConfirmationError ||
        
         this.state.inputPassword.length === 0 ||
         this.state.inputPasswordConfirmation.length === 0
        ) {
            // console.log('Cant continue with form errors');
    } else {
      axios.get('/api/registration', {
        params: {
          firstName: this.state.inputFirstName,
          email: this.state.inputEmail,
          password: this.state.inputPassword
        }
      })
      .catch(error => console.error('Error:', error))
      .then(
        (success: any ) => {
        if (success.data['response'] === 'success') {
          console.log(success)
          this.setState({registerSuccessful: true});
        } else {
          this.setState({existingUser: true});
       }
      });
    }  
    event.preventDefault();
  }

  handleTryAgain() {
    this.setState({
      inputFirstName: '',
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
            controlId="formHorizontalFirstName"
            validationState={this.firstNameGetValidationState()}
          >
            <Col  sm={2}>
              First name
            </Col>
            <Col sm={4}>
              <FormControl
                  type="text"
                  value={this.state.inputFirstName}
                  placeholder="Your first name"
                  onChange={this.handleInputFirstName}
                  onBlur={this.validateInputFirstName}
              />
            </Col>
            <Col sm={6}>
              {this.state.inputFirstNameError ?
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
