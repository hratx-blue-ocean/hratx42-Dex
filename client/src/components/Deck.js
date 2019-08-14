import React from 'react';
import { Card } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails'
import CardModal from './CardModal'

export default function Deck(props) {
  let cards = [];
  if (props.filterBy === ''){
    cards = props.deck.cards.slice(0, 6);
  } else {
    props.deck.cards.forEach((card) => {
      if (card.users.includes(props.filterBy)){
        cards.push(card);
      }
    })
  }
  return (
    <div style = {{width: '75%'}}>
      <div>
          <Card style = {{backgroundColor: '#eee'}}>
            <Card.Header>{props.deck.title}</Card.Header>
            <Card.Body className = 'row'>
            {cards.map((singleCard) => 
              <div key = {Math.random()}>
                <div style = {{paddingLeft: '160px'}}></div>
                <CardThumbnail singleCard = {singleCard} />
              </div>
             )}
              <div style = {{paddingLeft: '20px'}}></div>
              <CardModal />
            </Card.Body>
          </Card>
      </div>
    </div>
  )
}
