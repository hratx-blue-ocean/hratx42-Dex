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
      newPLayer: [],
      // dashboard edit profile form
<<<<<<< HEAD
      editProfileName: '',
      editProfileEmail: '',
<<<<<<< HEAD
      editProfilePassword: ''
  }

  // dashboard onChange event functions
  this.changeProfileName = this.changeProfileName.bind(this);
  this.changeProfileEmail = this.changeProfileEmail.bind(this);
  this.changeProfilePassword = this.changeProfilePassword.bind(this);
  this.submitProfileChanges = this.submitProfileChanges.bind(this);
}
=======
      editProfilePassword: '',
=======
      profile: {
        editName: '',
        editEmail: '',
        editPassword: '',
      },

>>>>>>> master
      flash: {
        show: false,
        message: 'Default flash message for testing',
        variant: 'success',
      },

      showTableModal: false,
    };
  }

<<<<<<< HEAD
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f

componentDidMount() {    
  global.flash = this.flash.bind(this)
  if(localStorage.getItem('token')) {
    this.login();
=======
  componentDidMount() {
    global.flash = this.flash.bind(this);
    global.setState = this.setState.bind(this);
    if (localStorage.getItem('token')) {
      this.login();
    }
>>>>>>> ac47602c4098202ebe1164fe014c64f155c72e59
  }

  flash(message, variant, interval) {
    this.setState({ flash: { show: true, message, variant } });
    setTimeout(() => {
      this.setState({ flash: { show: false, message, variant } });
    }, interval);
  }

<<<<<<< HEAD
<<<<<<< HEAD
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
    http.users.post(this.state.editProfileName, this.state.editProfileEmail, this.state.editProfilePassword)
      .then(() => 
        this.setState({ editProfileName: '' }),
        this.setState({ editProfileEmail: ''}),
        this.setState({ editProfilePassword: ''})
      )
      .catch(err => console.log('Error: ', err));

  }
=======
login() {
  auth.setUser(this);
}
=======
  login() {
    auth.setUser(this);
    this.getTables();
    this.getUser();
  }
>>>>>>> ac47602c4098202ebe1164fe014c64f155c72e59

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
    this.setState({ userId: '' })
  }

  changeTableModal() {
    this.setState({ showTableModal: !this.state.showTableModal });

<<<<<<< HEAD
submitProfileChanges() {
  http.users.post(this.state.editProfileName, this.state.editProfileEmail, this.state.editProfilePassword)
    .then(() => 
      this.setState({ editProfileName: '' }),
      this.setState({ editProfileEmail: ''}),
      this.setState({ editProfilePassword: ''})
    )
    .catch(err => console.log('Error: ', err));
}
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
=======
  }

  changeTable(id){
    this.setState({showenTable:id})
  }  
>>>>>>> master

  addPlayerToTable(playerName) {
    thePlayers.push(playerName);
    this.setState({ newPLayer: thePlayers })
  }

  removePlayerToTable(playerName) {
    let index = thePlayers.indexOf(playerName)
    thePlayers.splice(index, 1)
    this.setState({ newPLayer: thePlayers })
  }
  render() {
    return (
      <>
        <Router>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <h1>Welcome to Blue Ocean!</h1>
        <NavBar />
          <Route path="/" exact component={ Landing } />
          <Route 
=======
=======

>>>>>>> ac47602c4098202ebe1164fe014c64f155c72e59
        {this.state.userId ===''?<Landing login={this.login.bind(this)}/>:<NavBar logOut ={this.logOut.bind(this)}/>}
        <Route 
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
=======
          {auth.userIsLoggedIn() ? (
            <NavBar addTable={this.addTable.bind(this)} addPlayerToTable={this.addPlayerToTable.bind(this)} removePlayerToTable={this.removePlayerToTable.bind(this)} logOut={this.logOut.bind(this)} showTableModal={this.state.showTableModal} changeTableModal={this.changeTableModal.bind(this)} changeTable={this.changeTable.bind(this)} tables={this.state.tables} showenTable={this.state.showenTable} newPLayer={this.state.newPLayer} userName={this.state.user.name} />
          ) : null}
          <Route
            path="/"
            exact
            render={props => (
              <Landing {...props} login={this.login.bind(this)} />
            )}
          />
          <Route
>>>>>>> master
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
<<<<<<< HEAD
            />}
            
           />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
<<<<<<< HEAD
          {/* <Dashboard boards={this.state.boards} /> */}
=======
          <Route path="/TableSettings" component={ TableSettings } />
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
=======
              />
            )}
          />
          <Route path="/profile" component={Profile} />
          {this.state.tables.map(table =>
            <Route key={Math.random()} path={`/table/${table.id}`} render={() => <Table tableId={table.id} tableName={table.name} />} />
          )}

          <Route path="/TableSettings" component={TableSettings} />
>>>>>>> master
        </Router>
        <Flash flashData={this.state.flash} />
      </>
    );
  }
}
