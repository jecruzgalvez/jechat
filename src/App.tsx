import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import AppHeader from    './components/Header';
import Login from        './components/Login';
import Registration from './components/Registration';
import Dashboard from    './components/Dashboard';
import Settings from     './containers/Settings';
import Logout from       './containers/Logout';
import AppFooter from    './components/Footer';

import './App.css';

import { IntlProvider, addLocaleData } from 'react-intl';
import * as  locale_en from 'react-intl/locale-data/en'
import * as  locale_es from 'react-intl/locale-data/es'

const messages_en = require('../src/translations/en.json');
const messages_es = require('../src/translations/es.json');

const messages = {
  'en': messages_en,
  'es': messages_es
}

addLocaleData([...locale_en, ...locale_es]);

interface AppProps {
  language: string;
}

class App extends React.Component <AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    // debugger
    return (
    <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
      <div className="App">
        <AppHeader />
        <Router>
          <div>
            <ButtonGroup>
              <Button bsStyle="primary">
                <Link to="/login" className="menu">
                  <FormattedMessage
                    id="app.login"
                    defaultMessage= "Login"
                    />
                </Link>
              </Button>
              <Button bsStyle="primary">
                <Link to="/registration" className="menu">
                  <FormattedMessage
                    id="app.registration"
                    defaultMessage= "Registration"
                    />
                  </Link>
              </Button>
              <Button bsStyle="primary">
                <Link to="/dashboard" className="menu">
                  <FormattedMessage
                    id="app.dashboard"
                    defaultMessage= "Dashboard"
                    />
                </Link>
              </Button>
              <Button bsStyle="primary">
                <Link to="/settings" className="menu">
                  <FormattedMessage
                    id="app.settings"
                    defaultMessage= "Settings"
                    />
                </Link>
              </Button>
              <Button bsStyle="primary">
                <Link to="/logout" className="menu">
                  <FormattedMessage
                    id="app.logout"
                    defaultMessage= "Logout"
                    />
                </Link>
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
      </div>
    </IntlProvider>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    language: state.language.language
  }
}

export default connect(mapStateToProps, null)(App);
