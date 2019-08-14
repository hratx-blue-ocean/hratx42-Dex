import React, { useState } from "react";
import EditCardModal from './EditCardModal'
import { Card, Button, Col, Row } from 'react-bootstrap';

export default function CardThumbnails(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false)


  return (
    <div style = {{width: '150px', height: '150px'}}>
      
      <EditCardModal key={Math.random()} showMe={show} deckNames={props.deckNames} deckTitle={props.deckTitle} card={props.singleCard} closeModal={handleClose.bind(this)}/>
      <Card onClick={()=> {
        setShow(true)
      }}style = {{width: '150px', height: '150px'}} className = 'CardThumbnailsSingleCard'>
        <Row>
          <Col md={1}>
            <div className = 'cardThumbnails_impact'>{props.singleCard.card_weight}/{props.singleCard.card_impact}</div>
          </Col>
          <Col md={9}>
            {props.singleCard.card_labels.map((label) => <div key = {Math.random()} style = {{paddingLeft: '5px', fontSize: '8px', color: `${label.color}`}}>{label.label_name}</div>)}
          </Col>
        </Row>
          <div style = {{fontSize: '10px', paddingLeft: '5px'}}>{props.singleCard.card_title}</div>
        <div>
          <div style = {{position: 'relative', top: '95%'}}>
            <img className = 'CardThumbnailsMove' height = '15' src="./assets/downButton.png" onClick = {() => props.moveCard(props.singleCard, props.cardIndex, props.deckIndex, 1)}/>
            <img className = 'CardThumbnailsMove' height = '15' src="./assets/upButton.png" onClick = {() => props.moveCard(props.singleCard, props.cardIndex, props.deckIndex, -1)}/>
          </div>
          {props.singleCard.cards_members.map((member) => 
          <Button key = {Math.random()} className = 'CardThumbnails_userIcon float-right' variant='secondary'>{member.member_name.substring(0,2)}</Button>
          )}
        </div>
      </Card>
    </div>
  )
}
