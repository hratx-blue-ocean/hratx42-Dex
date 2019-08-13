import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

export default function CardThumbnails(props) {
  return (
    <div style = {{maxWidth: '150px', maxHeight: '150px'}}>
      <Card>
        <Row>
          <Col md={1}>
            <div className = 'cardThumbnails_impact'>{props.singleCard.impact}/{props.singleCard.weight}</div>
          </Col>
          <Col md={9}>
            {props.singleCard.labels.map((label) => <div key = {Math.random()} style = {{paddingLeft: '5px', fontSize: '8px', color: 'blue'}}>{label}</div>)}
          </Col>
        </Row>
          <div style = {{fontSize: '10px', paddingLeft: '5px'}}>{props.singleCard.description}</div>
        <div>
          <Button className = 'CardThumbnails_userIcon float-right' variant='secondary'>GG</Button>
          <Button className = 'CardThumbnails_userIcon float-right' variant='secondary'>JI</Button>
        </div>
      </Card>
    </div>
  )
}
