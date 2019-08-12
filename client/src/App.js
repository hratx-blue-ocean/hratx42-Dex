import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';
import NavBar from './components/NavBar.js'
import Table from './components/Table.js';
import TableThumbnails from './components/TableThumbnails.js';
// import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 0,
      boards: [
        {"id":0,
          "name":"firewall",
          "photo":"http://lorempixel.com/640/480/city",
          "users":
            [
              {"id":0,
                "email":"Jarrod_Stroman58@yahoo.com",
                "name":"Oscar_Konopelski",
                "photo":"http://lorempixel.com/640/480/animals"},
              {"id":1,
                "email":"Jeromy.Corkery@yahoo.com",
                "name":"Elsie.Stamm69",
                "photo":"http://lorempixel.com/640/480/animals"},
              {"id":2,
                "email":"Gerardo_Schowalter67@yahoo.com",
                "name":"Kiera_Renner98",
                "photo":"http://lorempixel.com/640/480/animals"},{"id":3,"email":"Landen_Torphy@gmail.com","name":"Zelda.Kertzmann21","photo":"http://lorempixel.com/640/480/animals"},{"id":4,"email":"Onie_Donnelly17@yahoo.com","name":"Vladimir.Jacobs25","photo":"http://lorempixel.com/640/480/animals"},{"id":5,"email":"Stephan38@gmail.com","name":"Will.Wiegand50","photo":"http://lorempixel.com/640/480/animals"},{"id":6,"email":"Timmy67@hotmail.com","name":"Hayley.Orn","photo":"http://lorempixel.com/640/480/animals"},{"id":7,"email":"Gloria75@hotmail.com","name":"Makayla_Waters57","photo":"http://lorempixel.com/640/480/animals"},{"id":8,"email":"Annalise79@yahoo.com","name":"Fay_Orn","photo":"http://lorempixel.com/640/480/animals"},{"id":9,"email":"Gregory_Gutkowski47@gmail.com","name":"Sierra.Roberts75","photo":"http://lorempixel.com/640/480/animals"},{"id":10,"email":"Kylie57@yahoo.com","name":"Mark39","photo":"http://lorempixel.com/640/480/animals"},{"id":11,"email":"Shanon53@gmail.com","name":"Josiane66","photo":"http://lorempixel.com/640/480/animals"}]}]
  }
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
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
        </Router>
        <TableThumbnails />
      </>
    );
  }
}
