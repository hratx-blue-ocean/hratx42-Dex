import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails'

export default function Deck(props) {
  let cards = [];
  if (props.filterBy === ''){
    cards = props.deck.cards.slice(0, 6);
  } else {
    props.deck.cards.map((card) => {
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
              <div key = {singleCard.id}>
                <div style = {{paddingLeft: '160px'}}></div>
                <CardThumbnail singleCard = {singleCard} />
              </div>
             )}
              <div style = {{paddingLeft: '20px'}}></div>
              <Button style = {{height: '75px', width: '75px'}} variant='success'>Add New Card</Button>
            </Card.Body>
          </Card>
      </div>
    </div>
  )
}
