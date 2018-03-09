import * as React from 'react';
// import { Redirect } from 'react-router';

// import '../../node_modules/bootstrap/dist/css/bootstrap.css';
// import { Alert, Button } from 'react-bootstrap';

interface RegisterState {
  inputUserName?:string;
  inputEmail?: string;
  inputPassword?: string;
  inputPasswordConfirmation?:string;
  existingUser: boolean;
}

class Register extends React.Component <{}, RegisterState>{
  constructor(props: {}) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputUserName = this.handleInputUserName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleInputPasswordConfirmation = this.handleInputPasswordConfirmation.bind(this);


    this.state = {
      inputUserName: '',
      inputEmail: 'jcruz@tekmexico.com',
      inputPassword: '',
      inputPasswordConfirmation: '',
      existingUser: false
    }
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
  handleSubmit(event : React.MouseEvent <HTMLInputElement> ) {
    let url = '/register';
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
      if(res.response === "success"){
        console.log("SUCCESS ", res.existingEmail);
      }
      else {
        console.log("FAIL ", res.existingEmail);        
      }
    });
    
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h4>Please fulfill the next information</h4>
        <form>
              User name
              <input
                type="userName"
                onChange= {this.handleInputUserName}
                placeholder="User Name"
                value= {this.state.inputUserName}
              />
              <br />
              Email
              <input
                type="email"
                onChange= {this.handleInputEmail}
                placeholder="jcruz@tekmexico.com"
                value= {this.state.inputEmail}
              />
              <br />
              Password
              <input
                type="text"
                onChange= {this.handleInputPassword}
                value= {this.state.inputPassword}
              />
              <br />
              Confirmation
              <input
                type="text"
                onChange= {this.handleInputPasswordConfirmation}
                value= {this.state.inputPasswordConfirmation}
              />
              <br />
              
              <input
                type="submit"
                onClick={this.handleSubmit}
                value="Register"
              />
        </form>
      </div>
    );
  }
}

export default Register;
