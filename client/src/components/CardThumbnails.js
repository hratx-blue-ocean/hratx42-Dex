import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

export default function CardThumbnails(props) {
  return (
    <div style = {{width: '150px', height: '150px'}}>
      <Card style = {{width: '150px', height: '150px'}} className = 'CardThumbnailsSingleCard'>
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
          <Button className = 'CardThumbnails_userIcon float-right' variant='secondary'>GB</Button>
          <Button className = 'CardThumbnails_userIcon float-right' variant='secondary'>JI</Button>
        </div>
      </Card>
    </div>
  )
}
