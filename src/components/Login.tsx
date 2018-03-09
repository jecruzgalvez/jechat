import * as React from 'react';
import { Redirect } from 'react-router';

interface LoginState {
  inputEmail?: string;
  inputPassword?: string;
  loggedIn: boolean;
}

class Login extends React.Component <{}, LoginState> {
  constructor(props: {}) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);

    this.state = {
      inputEmail: '',
      inputPassword: '',
      loggedIn: false
    }
  }

  handleInputEmail(event: React.ChangeEvent <HTMLInputElement>) {
    // console.log('Typed: ', event.target.value);
    this.setState( {inputEmail: event.target.value});
  }

  handleInputPassword(event: React.ChangeEvent <HTMLInputElement>) {
    // console.log('Typed: ', event.target.value);
    this.setState( {inputPassword: event.target.value});
  }

  handleClick(event : React.MouseEvent <HTMLInputElement> ) {
    var url = '/login';
    var data = {
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
        console.log("WELCOME");
        this.setState({loggedIn: true});
      }
      else
        console.log("USER NOT ALLOWED...");
        this.setState({loggedIn: false});
    });

    event.preventDefault();
  }

  render() {
    return (
      this.state.loggedIn ? (
        <Redirect to="/chat" />
      ) : (
      <form>
            Email
            <input
              type="text"
              onChange= {this.handleInputEmail}
              placeholder="jcruz@tekmexico.com"
              value= {this.state.inputEmail}              
            />
            <br />
            Password
            <input
              type="password"
              onChange= {this.handleInputPassword}
              value= {this.state.inputPassword}
              placeholder="******"
            />
            <br />
            <input
              type="submit"
              onClick={this.handleClick}
            />
      </form>
      )
    );
  }
}

export default Login;
