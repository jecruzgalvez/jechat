import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';

import AppHeader from './components/Header';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Logout from './components/Logout';
import AppFooter from './components/Footer';

import BookList from './containers/book-list';
import BookDetail from './containers/book-detail';

const App = () => (
  <div className="App">
    <AppHeader />
    <Router>    
      <div>
        <ButtonGroup>
          <Button bsStyle="primary">
            <Link to="/login" className="menu">Login</Link>
          </Button>
          <Button bsStyle="primary">
            <Link to="/registration" className="menu">Registration</Link>
          </Button>
          <Button bsStyle="primary">
            <Link to="/dashboard" className="menu">Dashboard</Link>
          </Button>
          <Button bsStyle="primary">
            <Link to="/settings" className="menu">Settings</Link>
          </Button>
          <Button bsStyle="primary">
            <Link to="/logout" className="menu">Logout</Link>
          </Button>
        </ButtonGroup>      

        <Route
          exact={true}
          path="/login"
          component={Login}        
        />
        <Route
          path="/registration"
          component={Registration}
        />
        <Route
          path="/dashboard"
          component={Dashboard}
        />
        <Route
          path="/settings"
          component={Settings}
        />
        <Route
          path="/logout"
          component={Logout}
        />
      </div>
    </Router>
    <AppFooter />

    <BookList />
    <BookDetail />
    
  </div>
);

export default App;
