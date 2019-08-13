import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';
<<<<<<< HEAD

import NavBar from './components/NavBar.js'
import Table from './components/Table.js';
// import './App.css';
=======
import auth from '../services/auth.js';
import NavBar from './components/NavBar.js'
import Table from './components/Table.js';
import Flash from './components/Flash'

>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41

import global from '../utils/global'
import tables from '../dummyData/tables.js';
import TableSettings from './components/TableSettings.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      boards: [],
      flash: {
        show: false,
        message: 'Default flash message for testing',
        variant: 'success'
      },

      showTableModal: false
    };
    this.api = `http://localhost:8000/api/example`;
    this.flash=this.flash.bind(this)

  }


componentDidMount() {    
  global.flash = this.flash.bind(this)
}

<<<<<<< HEAD
flash(message, interval){
  this.setState({flash: message});
  setTimeout(()=>{
      this.setState({flash:false})
  }, interval)
=======
flash(message, variant, interval){
  this.setState({flash: {show: true, message, variant}});
  setTimeout(()=>{
      this.setState({flash:{show: false, message, variant}})
  }, interval)
}

login() {
  auth.setUser(this);
}

logOut(){
  this.setState({userId:''})
}

changeTableModal() {
    this.setState({showTableModal: !this.state.showTableModal});
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
}

  render() {
    return (
      <>
        <Router>
        <h1>Welcome to Blue Ocean!</h1>
<<<<<<< HEAD
        <NavBar userid={this.state.userid} />
          <Route path="/" exact component={ Landing } />
=======
        {this.state.userId ===''?<Landing login={this.login.bind(this)}/>:<NavBar logOut ={this.logOut.bind(this)}/>}
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
          <Route path="/TableSettings" component={ TableSettings } />
        </Router>
        <Flash flashData={this.state.flash}/>
      </>
    );
  }
}
