import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';

import NavBar from './components/NavBar.js'
import Table from './components/Table.js';
// import './App.css';

import global from '../utils/global'
import tables from '../dummyData/tables.js';
import TableSettings from './components/TableSettings.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 'fdf',
      boards: [],
      flash: false,
    };
    this.api = `http://localhost:8000/api/example`;
    this.flash=this.flash.bind(this)

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

logOut(){
  this.setState({userid:''})
}

  render() {
    return (
      <>
        <Router>
        <h1>Welcome to Blue Ocean!</h1>
        {this.state.userid ===''?<Landing/>:<NavBar logOut ={this.logOut.bind(this)}/>}
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
          <Route path="/TableSettings" component={ TableSettings } />
        </Router>
      </>
    );
  }
}
