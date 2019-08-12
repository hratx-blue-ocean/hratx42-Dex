import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import Controls from './Controls';
import Deck from './Deck';
import mockHttp from '../../services/http/__mocks__/mockHttp';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      tickets: [{}],
      users: [],
      filterBy: '',
      sortBy: '',
    };
  }
  componentDidMount() {
    mockHttp.getDecks(0)
    .then((res) => {
      this.setState({decks: res})
    })
  }

  saveTable(tableName, descName) {
    //create/edit table
  }

  newPlayer(playerName) {
    //add user to users Array
  }

  render() {
    console.log(this.state.decks.length)
    return (
      <div>
        <Controls />
        {/* for each deck, create a deck */}
        {this.state.decks.length > 0 ? (<>
          {this.state.decks.map((deck) => <Deck key = {deck.id} deck = {deck} />)}
            <Card style = {{width: '75%', height: '150px'}}>
              <Button style = {{height: '75px', width: '75px'}} variant='success'>Add New Deck</Button>
            </Card>
        </>) : (<></>)}
        
        {/* chat box??? */}
      </div>
    )
  }
}
