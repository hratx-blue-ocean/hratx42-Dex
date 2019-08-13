import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';

import NavBar from './components/NavBar.js'
import Table from './components/Table.js';
import TableSettings from './components/TableSettings.js'
// import './App.css';

import global from '../utils/global'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      boards: [],
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

  render() {
    return (
      <>
        <Router>
        <h1>Welcome to Blue Ocean!</h1>
        <NavBar userid={this.state.userid} />
          <Route path="/" exact component={ Landing } />
          <Route 
            path="/boards"
            render={props => <Dashboard {...props} boards={this.state.boards} />}
           />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
          <Dashboard boards={this.state.boards} />
        </Router>
      </>
    );
  }
}
