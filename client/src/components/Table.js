import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import Controls from './Controls';
import Deck from './Deck'

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [{}],
      tickets: [{}],
      users: [],
      filterBy: '',
      sortBy: '',
    };
  }
  componentDidMount() {

  }

  saveTable(tableName, descName) {
    //create/edit table
  }

  newPlayer(playerName) {
    //add user to users Array
  }

  render() {
    return (
      <div>
        <Controls />
        
        {/* for each deck, create a deck */}
        <Deck />
        <Deck />
        <Card style = {{width: '75%', height: '150px'}}>
          <Button style = {{height: '75px', width: '75px'}} variant='success'>Add New Deck</Button>
        </Card>
        {/* chat box??? */}
      </div>
    )
  }
}
