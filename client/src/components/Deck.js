import React, { useState } from "react";
import { Card, Button, Modal } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails'
import NewCardModal from './NewCardModal'

export default function Deck(props) {
  const [show, setShow] = useState(false);
  const [showEditDeck, setShowEditDeck] = useState(false);
  const [title, setTitle] = useState(props.deck.title)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false)
  let cards = [];
  if (props.filterBy === 'Filter'){
    cards = props.deck.cards.slice(0, 6);
  } else {
    props.deck.cards.forEach((card) => {
      card.cards_members.forEach((member) => {
        if (member.member_name.includes(props.filterBy)) {
          cards.push(card);
        }
      })
    })
  }
  return (
    <div style = {{width: '75%'}}>
      <div>
          <Card style = {{backgroundColor: '#eee'}}>
          <Card.Header>
              <span>
                <span style = {{paddingRight: '30px'}}>{props.deck.title}</span>
                <Button variant="outline-success" onClick={()=> setShowEditDeck(true)}>Edit/Delete Deck</Button>
                <Modal show = {showEditDeck}>
                  <Modal.Header>
                    <Modal.Title>Delete/Edit Deck</Modal.Title>
                    <Modal.Body>
                      <p>Change Deck Title</p>
                      <input onChange = {(e) => setTitle(e.target.value)} value = {title} type="text"/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant='success' onClick={()=> {
                        setShowEditDeck(false)
                        props.editDeck(props.deck.id, title)}
                        }>Save Deck</Button>
                      <Button variant='danger' onClick={()=> {
                        setShowEditDeck(false)
                        props.deleteDeck(props.deck.id)}}>Delete Deck</Button>
                    </Modal.Footer>
                  </Modal.Header>
                </Modal>
              </span>
            </Card.Header>
            <Card.Body className = 'row'>
            {cards.map((singleCard) => 
              <div key = {Math.random()}>
                <div style = {{paddingLeft: '160px'}}></div>
                <CardThumbnail singleCard = {singleCard} deckTitle={props.deck.title} 
                deckNames={props.deckNames} editCard={props.editCard} users={props.users} />
              </div>
             )}
              <div style = {{paddingLeft: '20px'}}></div>
            <NewCardModal users={props.users} newCardData={props.newCardData} key={Math.random()} showMe={show}  deckNames={props.deckNames} closeModal={handleClose.bind(this)}/>
            <Button variant="outline-success" onClick={()=> handleShow()}>Add New Card</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
