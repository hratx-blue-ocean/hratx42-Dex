import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import Controls from './Controls';
import Deck from './Deck';
import mockHttp from '../../services/http/__mocks__/http';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      cards: [{}],
      users: [],
      filterBy: '',
      sortBy: '',
      searchName: ''
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

  searchText(text) {
    let { decks } = this.state;
    let cards = [];
    for (let i = 0; i < decks.length; i++){
      for(let j = 0; j < decks[i].cards.length; j++){
        if (decks[i].cards[j].description.includes(text)){
          cards.push(decks[i].cards[j])
          // if (decks[i].cards[j].description.length > 50){
          //   cards[cards.length - 1] = cards[cards.length - 1].substring(0, 47) + '...';
          // }
        }
      }
    }
    this.setState({cards, searchName: text})
  }

  render() {
    return (
      <div>
        <Controls searchText = {this.searchText.bind(this)} searchName = {this.state.searchName} cards = {this.state.cards}/>
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
