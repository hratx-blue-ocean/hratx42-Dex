import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Controls from './Controls';
import Deck from './Deck';
import http from '../../services/http/http.js';
import tableUtil from '../../utils/table';
import global from '../../utils/global';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [
        { id: 5, label_name: 'FrontEnd', color: '#60BE4E' },
        { id: 6, label_name: 'BackEnd', color: '#FF9E1A' },
        { id: 7, label_name: 'GitHub', color: '#C377E0' },
        { id: 8, label_name: 'Bug', color: '#FF77CC' },
        { id: 9, label_name: 'Review', color: '#50E897' },
        { id: 10, label_name: 'Research', color: '#00C2E2' },
        { id: 11, label_name: 'Styling', color: '#0079C0' },
        { id: 12, label_name: 'Implementation', color: '#EA5946' },
        { id: 13, label_name: 'Planning', color: '#4D4D4D' },
        { id: 14, label_name: 'User Stories', color: '#F1D600' },
      ],
      table: {},
      deckNames: [],
      decks: [],
      cards: [],
      users: [],
      filterBy: 'Filter',
      searchName: '',
      newDeck: {
        newDeckModal: false,
        newDeckTitle: '',
      },
    };
    this.handleModal = this.handleModal.bind(this);
    this.newCardDataCollector = this.newCardDataCollector.bind(this);
    this.editCardDataCollector = this.editCardDataCollector.bind(this);
  }
  async componentDidMount() {
    const tableId = this.props.match.params.id;
    tableUtil.deleteCardById = this.deleteCardById.bind(this);
    this.getAllTheData(tableId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.getAllTheData(nextProps.match.params.id);
    }
  }

  async getAllTheData(tableId) {
    console.log("Getting the data ", tableId)
    const table = await http.tables.getById(tableId);
    this.setState({ table });
    http.decks
      .get(tableId)
      .then(response => {
        this.setState({ decks: response, tableName: table.name });
      })
      //populated deckname for tickets
      .then(() => {
        let deckHolder = [];
        this.state.decks.forEach(deck => {
          deckHolder.push({ id: deck.id, title: deck.title });
        });
        //populated deckname for tickets
        this.setState({ deckNames: deckHolder });
        http.users.getByTableId(table.id).then(res => {
          this.setState({ users: res });
        });
      });
  }

  //ADD EDIT CARDS TO DB
  newCardDataCollector(players, tags, deck, cardInfo) {
    let toPost = {
      description: cardInfo.description,
      title: cardInfo.titl,
      weight: parseInt(cardInfo.eff),
      impact: parseInt(cardInfo.imp),
      deck_id: this.obtainDeckID(deck),
      table_id: this.state.table.id,
    };
    let toMembersPost = { cards_members: this.obtainPlayersId(players) };
    let toLabelsPost = { card_labels: this.obtainLabelIds(tags) };
    // console.log(toLabelsPost.card_labels)
    let addedCard;
    http.cards
      .post(toPost)
      .then(response => {
        console.log(response);
        addedCard = response;
        console.log(addedCard);
      })
      .then(response => {
        toMembersPost.cards_members.forEach(async player => {
          await http.cards.addUser(addedCard.id, player.member_id);
        });
        console.log(response);
      })
      .then(() => {
        toLabelsPost.card_labels.forEach(async label => {
          await http.cards.addLabel(addedCard.id, label.id);
        });
      });
  }

  editCardDataCollector(players, tags, deck, cardInfo) {
    let toPost = {
      description: cardInfo.description,
      id: cardInfo.id,
      title: cardInfo.titl,
      weight: parseInt(cardInfo.eff),
      impact: parseInt(cardInfo.imp),
      deck_id: this.obtainDeckID(deck),
      table_id: this.state.table.tableId,
    };
    let toMembersPost = { cards_members: this.obtainPlayersId(players) };
    let toLabelsPost = { card_labels: this.obtainLabelIds(tags) };
  }

  obtainPlayersId(players) {
    let users = this.state.users;
    let result = players;
    result.forEach(player => {
      if (!player.member_id) {
        users.forEach(user => {
          if (player.member_name === user.name) {
            player.member_id = user.id;
          }
        });
      }
    });
    return result;
  }

  obtainLabelIds(tags) {
    let labels = this.state.labels;
    let result = tags;
    result.forEach(tag => {
      if (!tag.id) {
        labels.forEach(label => {
          if (tag.label_name === label.label_name) {
            tag.color = label.color;
            tag.id = label.id;
          }
        });
      }
    });
    return result;
  }

  obtainDeckID(deckName) {
    let decks = this.state.decks;
    let result;
    decks.forEach((deck, i) => {
      if (deckName == deck.title) {
        result = deck.id;
      }
    });
    return result;
  }

  //FOR EDIT CARD
  findCardById(id) {
    let decks = [...this.state.decks];
    for (let deckIndex = 0; deckIndex < decks.length; deckIndex++) {
      for (
        let cardIndex = 0;
        cardIndex < decks[deckIndex].cards.length;
        cardIndex++
      ) {
        let currentCard = decks[deckIndex].cards[cardIndex];
        if (currentCard.id === id) {
          return {
            deckIndex: deckIndex,
            cardIndex: cardIndex,
          };
        }
      }
    }
    return false;
  }
  deleteCardById(id) {
    const decks = [...this.state.decks];
    const position = this.findCardById(id);
    if (position) {
      const { deckIndex, cardIndex } = position;
      decks[deckIndex].cards.splice(cardIndex, 1);
      this.setState({ decks });
      console.log('card deleted');
      http.cards.delete(id).then(() => {
        console.log('Deleted from db');
        global.flash('Card deleted', 'success', 1500);
      });
    }
  }

  //

  changeFilter(e) {
    if (this.state.filterBy === e.target.innerHTML) {
      this.setState({ filterBy: 'Filter' });
    } else {
      this.setState({ filterBy: e.target.innerHTML });
    }
  }

  searchText(text) {
    let { decks } = this.state;
    let cards = [];
    for (let i = 0; i < decks.length; i++) {
      for (let j = 0; j < decks[i].cards.length; j++) {
        if (decks[i].cards[j] && decks[i].cards[j].title.includes(text)) {
          cards.push(decks[i].cards[j]);
          // if (decks[i].cards[j].description.length > 50){
          //   cards[cards.length - 1] = cards[cards.length - 1].substring(0, 47) + '...';
          // }
        }
      }
    }
    this.setState({ cards, searchName: text });
  }

  handleModal() {
    let { newDeck } = this.state;
    if (newDeck.newDeckModal) {
      newDeck.newDeckModal = false;
      this.setState({ newDeck });
    } else {
      newDeck.newDeckModal = true;
      this.setState({ newDeckModal: true });
    }
  }

  submitNewDeck() {
    //submit new deck with this.state.newDeck.newDecktitle and table ID

    let { decks } = this.state;
    http.decks
      .post({ table_id: 1, title: this.state.newDeck.newDeckTitle })
      .then(res => {
        let { newDeck } = this.state;
        decks.push({ table_id: 1, title: this.state.newDeck.newDeckTitle });
        newDeck.newDeckModal = false;
        this.setState({ newDeck, decks });
      });
  }

  handleTextChange(e) {
    let { newDeck } = this.state;
    newDeck.newDeckTitle = e.target.value;
    this.setState({ newDeck });
  }
  deleteDeck(id, deckIndex) {
    let { decks } = this.state;
    http.decks.delete(id).then(res => {
      decks.splice(deckIndex, 1);
      this.setState({ decks });
    });
  }

  editDeck(id, title, deckIndex) {
    let { decks } = this.state;
    http.decks.put({ id, title }).then(res => {
      decks[deckIndex].title = title;
      this.setState({ decks });
    });
  }

  moveCard(card, cardIndex, deckIndex, direction) {
    let { decks } = this.state;
    let newCard = { ...card };
    newCard.deck_id = decks[deckIndex + direction].id;
    if (decks[deckIndex + direction]) {
      decks[deckIndex + direction].cards.push(card);
      decks[deckIndex].cards.splice(cardIndex, 1);
    }

    delete newCard['card_labels'];
    delete newCard['cards_members'];
    console.log(decks);
    this.setState({ decks });
    http.cards
      .put(newCard)
      .then(res => console.log('this is the card move response', res));
  }

  render() {
    return (
      <div>
        <Controls
          searchText={this.searchText.bind(this)}
          searchName={this.state.searchName}
          cards={this.state.cards}
          users={this.state.users}
          changeFilter={this.changeFilter.bind(this)}
          handleModal={this.handleModal.bind(this)}
          filterBy={this.state.filterBy}
          deckNames={this.state.deckNames}
          tableId={this.state.table.id}
          tableName={this.state.table.name}
          labels={this.state.labels}
        />
        {/* for each deck, create a deck */}
        {this.state.decks.length > 0 ? (
          <>
            {this.state.decks.map((deck, deckIndex) => (
              <div key={deck.id}>
                <Deck
                  filterBy={this.state.filterBy}
                  deck={deck}
                  users={this.state.users}
                  deckNames={this.state.deckNames}
                  deckIndex={deckIndex}
                  deleteDeck={this.deleteDeck.bind(this)}
                  newCardData={this.newCardDataCollector}
                  editCard={this.editCardDataCollector}
                  editDeck={this.editDeck.bind(this)}
                  moveCard={this.moveCard.bind(this)}
                  labels={this.state.labels}
                />
                <div style={{ paddingBottom: '8px' }} />
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
        <Modal
          show={this.state.newDeck.newDeckModal}
          onHide={() => this.handleModal()}
        >
          <Modal.Header
            closeButton
            onClick={() => this.handleModal()}
            onHide={() => this.handleModal()}
          >
            <Modal.Title>Add Deck</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Enter Deck Title</p>
            <input
              onChange={e => this.handleTextChange(e)}
              value={this.state.newDeck.newDeckTitle}
              type="text"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.handleModal()}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => this.submitNewDeck()}>
              Save Deck
            </Button>
          </Modal.Footer>
        </Modal>
        {/* chat box??? */}
      </div>
    );
  }
}
