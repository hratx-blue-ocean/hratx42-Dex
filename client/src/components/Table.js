import React, { Component } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import Controls from './Controls';
import Deck from './Deck';
import mockHttp from '../../services/http/__mocks__/http';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
<<<<<<< HEAD
      tickets: [{}],
      users: [],
=======
      cards: [{}],
      users: ['Michael', 'Brian', 'Laine', 'Rachel', 'Miles', 'Ibrahim'],
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
      filterBy: '',
      sortBy: '',
      searchName: '',
      newDeck: {
        newDeckModal: false,
        newDeckTitle: ''
      }
    };
    this.handleModal = this.handleModal.bind(this);
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

<<<<<<< HEAD
=======
  searchClick(card) {

  }

  changeFilter(e) {
    if (this.state.filterBy === e.target.innerHTML){
      this.setState({filterBy: ''});
    } else {this.setState({filterBy: e.target.innerHTML})}
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

  handleModal() {
    let { newDeck } = this.state;
    if (newDeck.newDeckModal){
      newDeck.newDeckModal = false;
      this.setState({newDeck})
    } else {
      newDeck.newDeckModal = true;
      this.setState({newDeckModal: true})}
  }

  submitNewDeck() {
    //submit new deck with this.state.newDeck.newDecktitle and table ID
  }

>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
  render() {
    console.log(this.state.decks.length)
    return (
      <div>
<<<<<<< HEAD
        <Controls />
        {/* for each deck, create a deck */}
        {this.state.decks.length > 0 ? (<>
          {this.state.decks.map((deck) => <Deck key = {deck.id} deck = {deck} />)}
            <Card style = {{width: '75%', height: '150px'}}>
              <Button style = {{height: '75px', width: '75px'}} variant='success'>Add New Deck</Button>
            </Card>
=======
        <Controls 
          searchText = {this.searchText.bind(this)} 
          searchName = {this.state.searchName} 
          cards = {this.state.cards}
          users = {this.state.users}
          changeFilter = {this.changeFilter.bind(this)}
          searchClick = {this.searchClick.bind(this)}
          />
        {/* for each deck, create a deck */}
        {this.state.decks.length > 0 ? (<>
          {this.state.decks.map((deck) => <>
              <Deck key = {deck.id} filterBy = {this.state.filterBy} deck = {deck} />
              <div style = {{paddingBottom: '8px'}}></div>
            </>)
          }
          <Card style = {{width: '75%', height: '150px'}}>
            <Button onClick = {()=>this.handleModal()} style = {{height: '75px', width: '75px'}} variant='success'>Add New Deck</Button>
            <Modal show = {this.state.newDeck.newDeckModal}>
              <Modal.Header>
                <Modal.Title>New Deck</Modal.Title>
                <Modal.Body>
                  <p>Input Deck Title</p>
                  <input type="text"/>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='success' onClick={()=> this.submitNewDeck()}>Save Deck</Button>
                  <Button variant='Danger' onClick={()=>this.handleModal()}>Cancel</Button>
                </Modal.Footer>
              </Modal.Header>
            </Modal>
          </Card>
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
        </>) : (<></>)}
        
        {/* chat box??? */}
      </div>
    )
  }
}
