import React from 'react';
import { Card } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails'
import CardModal from './CardModal'

export default function Deck(props) {
<<<<<<< HEAD
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
=======
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
              <div key = {singleCard.id}>
                <div style = {{paddingLeft: '160px'}}></div>
                <CardThumbnail singleCard = {singleCard} />
              </div>
             )}
              <div style = {{paddingLeft: '20px'}}></div>
              <CardModal />
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
            </Card.Body>
          </Card>
      </div>
    </div>
  )
}
