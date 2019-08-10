import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Boards from './components/Dashboard.js/index.js.js';
import Profile from './components/Profile.js';
import NavBar from './components/NavBar.js'
// import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      boards: []
    };
    this.api = `http://localhost:8000/api/example`;
  }
  componentDidMount() {
    // fetch(this.api)
    //   .then(res => res.json())
    //   .then(seaCreatures => {
    //     this.setState({ seaCreatures: seaCreatures.data });
    //   });
  }

  render() {
    return (
      <>
        <Router>
        <h1>Welcome to Blue Ocean!</h1>
        <NavBar />
          <Route path="/" exact component={ Landing } />
          <Route path="/boards" component={ Boards } />
          <Route path="/profile" component={ Profile } />
        </Router>
      </>
    );
  }
}
