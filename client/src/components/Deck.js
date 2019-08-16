import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails';
import NewCardModal from './NewCardModal';


export default function Deck(props) {
  const [show, setShow] = useState(false);
  const [showEditDeck, setShowEditDeck] = useState(false);
  const [title, setTitle] = useState(props.deck.title);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  let cards = [];
  if (props.deck.cards) {
    if (props.filterBy === 'Filter') {
      cards = props.deck.cards.slice(0, 20);
    } else {
      props.deck.cards.forEach(card => {
        card.cards_members.forEach(member => {
          if (member.member_name) {
            if (member.member_name.includes(props.filterBy)) {
              cards.push(card);
            }
          }
        });
      });
    }
  }
  return (
    <div id="deckWrapper">
      <div id="deckContent" style={{ width: '100%' }} >
        <div id="deckHeader" style={{ width: '100%' }}> <span className="deckTitle">{props.deck.title} </span>
          <div style={{ float: 'right' }}><Button
            className="deckEditBtn"
            variant='link'
            onClick={() => setShowEditDeck(true)}
          >
            ...
              </Button></div>
        </div>
        <div id="deckScrollbar" style={{ overflow: 'scroll' }}>
          <Card.Body className='row'>
            {cards.map((singleCard, cardIndex) =>
              <div key={Math.random()}>
                <div style={{ paddingLeft: '160px' }}></div>

                <CardThumbnail deckIndex={props.deckIndex}
                  cardIndex={cardIndex}
                  singleCard={singleCard}
                  deckTitle={props.deck.title}
                  deckNames={props.deckNames}
                  moveCard={props.moveCard}
                  editCard={props.editCard}
                  users={props.users}
                  labels={props.labels} />
              </div>
            )}
            <div style={{ paddingLeft: '20px' }} />
            <NewCardModal
              newCardData={props.newCardData}
              key={Math.random()}
              showMe={show}
              deckNames={props.deckNames}
              closeModal={handleClose.bind(this)}
              newCardData={props.newCardData}
              users={props.users}
              labels={props.labels}
              card={props.singleCard}

            />
            <Button className="deckAddAnotherCardBtn" className='row' variant='outline-success' onClick={() => handleShow()}>
              Add Another Card
            </Button>
          </Card.Body>
        </div>
      </div>
      <div>
        <Modal size='lg' show={showEditDeck} onHide={() => setShowEditDeck(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div>Delete/Edit Deck</div>
            </Modal.Title>
            <Modal.Body>
              <p>Change Deck Title</p>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant='success' onClick={() => {
                setShowEditDeck(false)
                props.editDeck(props.deck.id, title, props.deckIndex)
              }
              }>Save Deck</Button>
              <Button variant='danger' onClick={() => {
                setShowEditDeck(false)
                props.deleteDeck(props.deck.id, props.deckIndex)
              }}>Delete Deck</Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
      </div>
    </div >
  );
}
