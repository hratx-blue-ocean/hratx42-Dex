import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';
import NavBar from './components/NavBar.js'
import Table from './components/Table.js';
import http from '../services/http/http.js';
// import './App.css';

import global from '../utils/global'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 0,
      boards: [],
      // dashboard edit profile form
      editProfileName: '',
      editProfileEmail: '',
      editProfilePassword: ''
  }

  // dashboard onChange event functions
  this.changeProfileName = this.changeProfileName.bind(this);
  this.changeProfileEmail = this.changeProfileEmail.bind(this);
  this.changeProfilePassword = this.changeProfilePassword.bind(this);
  this.submitProfileChanges = this.submitProfileChanges.bind(this);
}

componentDidMount() {    
  global.flash = this.flash.bind(this)
}

flash(message, interval){
  this.setState({flash: message});
  setTimeout(()=>{
      this.setState({flash:false})
  }, interval)
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
    http.users.post(this.state.editProfileName, this.state.editProfileEmail, this.state.editProfilePassword)
      .then(() => 
        this.setState({ editProfileName: '' }),
        this.setState({ editProfileEmail: ''}),
        this.setState({ editProfilePassword: ''})
      )
      .catch(err => console.log('Error: ', err));

  }

  render() {
    return (
      <>
        <Router>
        <h1>Welcome to Blue Ocean!</h1>
        <NavBar />
          <Route path="/" exact component={ Landing } />
          <Route 
            path="/dashboard"
            render={props => 
              <Dashboard {...props}
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
            />}
            
           />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
          {/* <Dashboard boards={this.state.boards} /> */}
        </Router>
      </>
    );
  }
}
