import React, { useState } from "react";
import { OverlayTrigger, Tooltip, Card, Button, Col, Row } from 'react-bootstrap';

export default function DashboardCards(props) {

  return (
    <div style={{ width: '150px', height: '150px' }}>

      <Card style={{ width: '150px', height: '150px' }} className='CardThumbnailsSingleCard'>
        <Row>
          <Col md={1}>
            <div className='cardThumbnails_impact'> {props.singleCard.weight}/{props.singleCard.impact}</div>
          </Col>
          <Col md={9}>
            {props.singleCard.card_labels.map((label) => <div key={Math.random()} style={{ paddingLeft: '5px', fontSize: '8px', color: `${label.color}` }}>{label.label_name}</div>)}
          </Col>
        </Row>
        <div style={{ fontSize: '12px', paddingLeft: '5px' }}>{props.singleCard.title}</div>
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
