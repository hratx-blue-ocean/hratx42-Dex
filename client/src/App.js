import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';

import NavBar from './components/NavBar.js'
import Table from './components/Table.js';
import Flash from './components/Flash'


import global from '../utils/global'
import tables from '../dummyData/tables.js';
import TableSettings from './components/TableSettings.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 'fdf',
      boards: [],
<<<<<<< HEAD
=======
      flash: {
        show: false,
        message: 'Default flash message for testing',
        variant: 'success'
      },
>>>>>>> 3633b121d97976159c5ccddcbd4e511c239b06eb
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

logOut(){
  this.setState({userid:''})
}

  render() {
    return (
      <>
        <Router>
        <h1>Welcome to Blue Ocean!</h1>
<<<<<<< HEAD
        <NavBar userid={this.state.userid} />
          <Route path="/" exact component={ Landing } />
          <Route 
            path="/boards"
            render={props => <Dashboard {...props} boards={this.state.boards} />}
           />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
          <Dashboard boards={this.state.boards} />
=======
        {this.state.userid ===''?<Landing/>:<NavBar logOut ={this.logOut.bind(this)}/>}
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
          <Route path="/TableSettings" component={ TableSettings } />
>>>>>>> 3633b121d97976159c5ccddcbd4e511c239b06eb
        </Router>
        <Flash flashData={this.state.flash}/>
      </>
    );
  }
}
