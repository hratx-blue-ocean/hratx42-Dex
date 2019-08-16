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
let thePlayers = [];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '', //NB userId should be deprecated in favor of user, which contains id
      user: {},
      tables: [],
      showenTable: null,
      newPlayer: [],
      // dashboard edit profile form
      profile: {
        editName: '',
        editEmail: '',
        editPassword: '',
      },

      flash: {
        show: false,
        message: 'Default flash message for testing',
        variant: 'success',
      },

      showTableModal: false,
    };
  }

  componentDidMount() {
    global.flash = this.flash.bind(this);
    global.setState = this.setState.bind(this);
    if (localStorage.getItem('token')) {
      this.login();
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
    this.getUser();
  }

  async getTables() {
    const userId = auth.getUser();
    if (userId) {
      const tables = await http.tables.get(userId);
      this.setState({ tables });
    }
  }

  async getUser() {
    const userId = auth.getUser();
    if (userId) {
      const user = await http.users.get(userId);
      this.setState({ user });
    }
  }

  async addTable(name, emails) {
    const newTable = await http.tables.post({ name });
    const tableId = newTable.id;
    http.tables.postUser(tableId, this.state.user.email)
    const tables = [...this.state.tables];
    tables.push(newTable);
    this.setState({ tables });
    for (let email of emails) {
      http.tables.postUser(tableId, email);
    }
    this.changeTableModal()
  }

  logOut() {
    auth.logout();
    http.auth.logout();
    auth.setUser(this);
  }

  changeTableModal() {
    this.setState({ showTableModal: !this.state.showTableModal });

  }

  changeTable(id){
    this.setState({showenTable:id})
  }  

  addPlayerToTable(playerName) {
    thePlayers.push(playerName);
    this.setState({ newPlayer: thePlayers })
  }

  removePlayerToTable(playerName) {
    let index = thePlayers.indexOf(playerName)
    thePlayers.splice(index, 1)
    this.setState({ newPlayer: thePlayers })
  }
  render() {
    return (
      <>
        <Router>
          {auth.userIsLoggedIn() ? (
            <NavBar
              addTable={this.addTable.bind(this)}
              addPlayerToTable={this.addPlayerToTable.bind(this)}
              removePlayerToTable={this.removePlayerToTable.bind(this)}
              logOut={this.logOut.bind(this)}
              showTableModal={this.state.showTableModal}
              changeTableModal={this.changeTableModal.bind(this)}
              changeTable={this.changeTable.bind(this)}
              tables={this.state.tables}
              showenTable={this.state.showenTable}
              newPlayer={this.state.newPlayer}
              userName={this.state.user.name} />
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
                state = {this.state}
                user={this.state.user}
                userId={this.state.userId}
                tables={this.state.tables}
                editProfileName={this.state.profile.editName}
                editProfileEmail={this.state.profile.editEmail}
                editProfilePassword={this.state.profile.editPassword}
                // functions
                changeProfileName={this.changeProfileName}
                changeProfileEmail={this.changeProfileEmail}
                changeProfilePassword={this.changeProfilePassword}
                submitProfileChanges={this.submitProfileChanges}
              />
            )}
          />
          <Route path="/profile" component={Profile} />
          {this.state.tables.map(table =>
            <Route key={Math.random()} path={`/table/${table.id}`} render={() => <Table tableId={table.id} tableName={table.name} />} />
          )}

          <Route path="/TableSettings" component={TableSettings} />
        </Router>
        <Flash flashData={this.state.flash} />
      </>
    );
  }
}
