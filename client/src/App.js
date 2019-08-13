import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';

import NavBar from './components/NavBar.js'
import Table from './components/Table.js';
import Flash from './components/Flash'

import global from '../utils/global'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      boards: [],
      flash: {
        show: false,
        message: 'Default flash message for testing',
        variant: 'success'
      },
    };
    this.api = `http://localhost:8000/api/example`;
  }


componentDidMount() {    
  global.flash = this.flash.bind(this)
}

flash(message, variant, interval){
  this.setState({flash: {show: true, message, variant}});
  setTimeout(()=>{
      this.setState({flash:{show: false, message, variant}})
  }, interval)
}

  render() {
    return (
      <>
        <Router>
        <h1>Welcome to Blue Ocean!</h1>
        <NavBar userid={this.state.userid} />
          <Route path="/" exact component={ Landing } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
        </Router>
        <Flash flashData={this.state.flash}/>
      </>
    );
  }
}
