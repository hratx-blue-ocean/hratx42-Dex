import React, { useState } from "react";
import { Card, Button } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails'
import NewCardModal from './NewCardModal'

export default function Deck(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false)



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
            <NewCardModal showMe={show}  closeModal={handleClose.bind(this)}/>
            <Button variant="outline-success" 
            onClick={()=> {
              handleShow()
            }}
            >Add New Card</Button>
            </Card.Body>
          </Card>
      </div>
    </div>
  )
}
