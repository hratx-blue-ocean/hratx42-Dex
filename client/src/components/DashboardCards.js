import React, { useState } from "react";
import { OverlayTrigger, Tooltip, Card, Button, Col, Row } from 'react-bootstrap';

export default function DashboardCards(props) {
  let { singleCard } = props
  let card_labels = [];
  let cards_members = [];
  for (let  i = 0; i < singleCard.cards_members.length; i++){
    let add = true;
    for (let j = 0; j < cards_members.length; j++){
      if (cards_members[j].member_id == singleCard.cards_members[i].member_id){
        add = false;
      }
    }
    if (add) {cards_members.push(singleCard.cards_members[i])}
  }
  for (let  i = 0; i < singleCard.card_labels.length; i++){
    let add = true;
    for (let j = 0; j < card_labels.length; j++){
      if (card_labels[j].id == singleCard.card_labels[i].id){
        add = false;
      }
    }
    if (add) {card_labels.push(singleCard.card_labels[i])}
  }
  singleCard.card_labels = card_labels;
  singleCard.cards_members = cards_members;

  return (
    <div style={{ width: '150px', height: '150px' }}>

      <Card style={{ width: '150px', height: '150px' }} className='CardThumbnailsSingleCard'>
        <Row>
          <Col md={1}>
            <div className='cardThumbnails_impact'> {singleCard.weight}/{singleCard.impact}</div>
          </Col>
          <Col md={9}>
            {singleCard.card_labels.map((label) => <div key={Math.random()} style={{ paddingLeft: '5px', fontSize: '8px', color: `${label.color}` }}>{label.label_name}</div>)}
          </Col>
        </Row>
        <div style={{ fontSize: '12px', paddingLeft: '5px' }}>{singleCard.title}</div>
        <div>

          {/* more users button leads to edit form to view all users */}
          <OverlayTrigger
            key={'bottom'}
            placement={'bottom'}
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                Add/View More
              </Tooltip>
            }
          >
            <Button
              key={Math.random()}
              className='CardThumbnails_userIcon float-right'
              variant='secondary'
              onClick={() => {
                setShow(true)
              }}
            ><strong>+</strong>
            </Button>
          </OverlayTrigger>
              <OverlayTrigger
                key={Math.random()}
                placement={'bottom'}
                overlay={
                  <Tooltip id={`tooltip-bottom`}>{props.user}</Tooltip>} >
                <Button key={Math.random()} className='CardThumbnails_userIcon float-right' variant='secondary'>{props.user.split(" ").map(char => char[0]).join("").toUpperCase()}</Button>
              </OverlayTrigger>

        </div>
      </Card>
    </div>
  )
}
