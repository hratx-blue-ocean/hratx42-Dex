import React, { useState } from "react";
import EditCardModal from './EditCardModal'
import { OverlayTrigger, Tooltip, Card, Button, Col, Row } from 'react-bootstrap';

export default function CardThumbnails(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false)


  return (
    <div style={{ width: '150px', height: '150px' }}>

      <EditCardModal users={props.users} labels={props.labels} editCard={props.editCard} key={Math.random()} showMe={show} deckNames={props.deckNames} deckTitle={props.deckTitle} card={props.singleCard} closeModal={handleClose.bind(this)} />
      <Card onClick={() => {
        setShow(true)
      }} style={{ width: '150px', height: '150px' }} className='CardThumbnailsSingleCard'>
        <Row>
          <Col md={1}>
            <div className='cardThumbnails_impact'>{props.singleCard.weight}/{props.singleCard.impact}</div>
          </Col>
          <Col md={9}>
            {props.singleCard.card_labels.map((label) => <div key={Math.random()} style={{ paddingLeft: '5px', fontSize: '8px', color: `${label.color}` }}>{label.label_name}</div>)}
          </Col>
        </Row>
        <div style={{ fontSize: '10px', paddingLeft: '5px' }}>{props.singleCard.title}</div>
        <div>
          <div style={{ position: 'absolute', top: '80%' }}>
            <img className='CardThumbnailsMove' height='15' src="/assets/downButton.png" onClick={() => props.moveCard(props.singleCard, props.cardIndex, props.deckIndex, 1)} />
            <img className='CardThumbnailsMove' height='15' src="/assets/upButton.png" onClick={() => props.moveCard(props.singleCard, props.cardIndex, props.deckIndex, -1)} />
          </div>
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
          {props.singleCard.cards_members.map((member, i) =>
            <div key={Math.random}>
              <OverlayTrigger
                key={Math.random()}
                placement={'bottom'}
                overlay={
                  <Tooltip id={`tooltip-bottom`}>
                    {member.member_name}
                  </Tooltip>
                }
              >
                {member.member_name === null ? (<></>) : i < 3 ? (<Button key={Math.random()} className='CardThumbnails_userIcon float-right' variant='secondary'>{member.member_name.split(" ").map(char => char[0]).join("").toUpperCase()}</Button>) : ''}
              </OverlayTrigger>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
