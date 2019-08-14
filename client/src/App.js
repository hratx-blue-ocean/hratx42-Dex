import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//components
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';
import NavBar from './components/NavBar.js';
import Table from './components/Table.js';
import Flash from './components/Flash';
import TableSettings from './components/TableSettings.js';

//services
import http from '../services/http/http.js';
import auth from '../services/auth.js';

//utils
import global from '../utils/global';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      tables: [],
      // dashboard edit profile form
      editProfileName: '',
      editProfileEmail: '',
      editProfilePassword: '',
      flash: {
        show: false,
        message: 'Default flash message for testing',
        variant: 'success',
      },

      showTableModal: false,
    };

    // dashboard onChange event functions
    this.changeProfileName = this.changeProfileName.bind(this);
    this.changeProfileEmail = this.changeProfileEmail.bind(this);
    this.changeProfilePassword = this.changeProfilePassword.bind(this);
    this.submitProfileChanges = this.submitProfileChanges.bind(this);
  }

  componentDidMount() {
    global.flash = this.flash.bind(this);
    if (localStorage.getItem('token')) {
      this.login();
      // axios.defaults.headers.common['x-access-token'] = auth.getJwt() ? auth.getJwt() : undefined;
    }
  }

  flash(message, variant, interval) {
    this.setState({ flash: { show: true, message, variant } });
    setTimeout(() => {
      this.setState({ flash: { show: false, message, variant } });
    }, interval);
  }

  login() {
    auth.setUser(this);
    this.getTables();
  }

  getTables() {
    const userId = auth.getUser();
    if (userId) {
      http.tables.get(userId).then(tables => {
        this.setState({ tables });
      });
    }
  }

  logOut() {
    auth.logout();
    auth.setUser(this);
  }

  changeTableModal() {
    this.setState({ showTableModal: !this.state.showTableModal });
  }

  // dashboard onChange event and submit functions
  changeProfileName(e) {
    this.setState({ editProfileName: e.target.value });
  }

  changeProfileEmail(e) {
    this.setState({ editProfileEmail: e.target.value });
  }

  changeProfilePassword(e) {
    this.setState({ editProfilePassword: e.target.value });
  }

  submitProfileChanges() {
    http.users
      .post(
        this.state.editProfileName,
        this.state.editProfileEmail,
        this.state.editProfilePassword
      )
      .then(
        () => this.setState({ editProfileName: '' }),
        this.setState({ editProfileEmail: '' }),
        this.setState({ editProfilePassword: '' })
      )
      .catch(err => console.log('Error: ', err));
  }

  render() {
    return (
      <>
        <Router>
          {auth.userIsLoggedIn() ? (
            <NavBar logOut={this.logOut.bind(this)} />
          ) : null}
          <Route
            path="/"
            exact
            render={props => (
              <Landing {...props} login={this.login.bind(this)} />
            )}
          />
          <Route
            path="/dashboard"
            render={props => (
              <Dashboard
                {...props}
                // state props
                boards={this.state.boards}
                editProfileName={this.state.editProfileName}
                editProfileEmail={this.state.editProfileEmail}
                editProfilePassword={this.state.editProfilePassword}
                // functions
                changeProfileName={this.changeProfileName}
                changeProfileEmail={this.changeProfileEmail}
                changeProfilePassword={this.changeProfilePassword}
                submitProfileChanges={this.submitProfileChanges}
              />
            )}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/table" component={Table} />
          <Route path="/TableSettings" component={TableSettings} />
        </Router>
        <Flash flashData={this.state.flash} />
      </>
    );
  }
}
