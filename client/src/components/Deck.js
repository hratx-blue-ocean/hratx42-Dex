import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails'

export default function Deck(props) {
  let cards = props.deck.cards.slice(0, 5)
  return (
    <div style = {{width: '75%'}}>
      <div>
          <Card>
            <Card.Body className = 'row'>
            {cards.map((singleCard) => 
            <div key = {singleCard.id}>
              <div style = {{paddingLeft: '20px'}}></div>
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
