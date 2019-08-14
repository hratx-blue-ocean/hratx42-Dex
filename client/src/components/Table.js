import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Controls from './Controls';
import Deck from './Deck';
import http from '../../services/http/http.js';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [{}],
      deckNames: [],
      decks: [],
      cards: [],
      users: [],
      filterBy: 'Filter',
      searchName: '',
      newDeck: {
        newDeckModal: false,
        newDeckTitle: ''
      }
    };
    this.handleModal = this.handleModal.bind(this);
    this.newCardDataCollector=this.newCardDataCollector.bind(this)
  }
  componentDidMount() {
    http.decks.get(1)
    .then((response) => {
      console.log('table data', response)
      this.setState({decks: response})
    })
    //populated deckname for tickets
    .then(() =>{
      let deckHolder= []
      this.state.decks.forEach(deck =>{
        deckHolder.push({id: deck.id, title: deck.title})
      })
      this.setState({deckNames: deckHolder})
    })
    http.users.getByTableId(1)
    .then((res)=> {
      console.log(res)
      this.setState({users: res})
    })
    // mockHttp.getDecks(0)
    // .then((res) => {
    //   this.setState({decks: res})
    // })
  }

  newCardDataCollector (eff,imp,title,players,tag,dueDate,deck,desc) {
    console.log(eff)
    console.log(imp)
    console.log(title)
    console.log(players)
    console.log(tag)
    // console.log(dueDate)
    // console.log(deck)
    // console.log(desc)
  }
  

  saveTable(tableName, descName) {
    //create/edit table
  }

  newPlayer(playerName) {
    //add user to users Array
  }

  searchClick(card) {

  }


  changeFilter(e) {
    if (this.state.filterBy === e.target.innerHTML){
      this.setState({filterBy: 'Filter'});
    } else {this.setState({filterBy: e.target.innerHTML})}
  }

  searchText(text) {
    let { decks } = this.state;
    let cards = [];
    for (let i = 0; i < decks.length; i++){
      for(let j = 0; j < decks[i].cards.length; j++){
        if (decks[i].cards[j].card_title.includes(text)){
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
    http.decks.post({table_id: 1, title: this.state.newDeck.newDeckTitle})
    .then((res) => console.log(res))
  }

  handleTextChange(e) {
    let { newDeck } = this.state;
    newDeck.newDeckTitle = e.target.value;
    this.setState({newDeck})
  }

  render() {
    return (
      <div>
        <Controls 
          searchText = {this.searchText.bind(this)} 
          searchName = {this.state.searchName} 
          cards = {this.state.cards}
          users = {this.state.users}
          changeFilter = {this.changeFilter.bind(this)}
          searchClick = {this.searchClick.bind(this)}
          handleModal = {this.handleModal.bind(this)}
          filterBy = {this.state.filterBy}
          />
        {/* for each deck, create a deck */}
        {this.state.decks.length > 0 ? (<>
          {this.state.decks.map((deck) => <div key = {deck.id}>
              <Deck filterBy = {this.state.filterBy} deck = {deck} 
              deckNames={this.state.deckNames} newCardData={this.newCardDataCollector}/>
              <div style = {{paddingBottom: '8px'}}></div>
            </div>)
          }
        </>) : (<></>)}
        <Modal show = {this.state.newDeck.newDeckModal}>
          <Modal.Header>
            <Modal.Title>New Deck</Modal.Title>
            <Modal.Body>
              <p>Input Deck Title</p>
              <input onChange = {(e) => this.handleTextChange(e)} value = {this.state.newDeck.newDeckTitle} type="text"/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='success' onClick={()=> this.submitNewDeck()}>Save Deck</Button>
              <Button variant='danger' onClick={()=>this.handleModal()}>Cancel</Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
        {/* chat box??? */}
      </div>
    )
  }
}
