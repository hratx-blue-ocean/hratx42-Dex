import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

export default function CardThumbnails(props) {
  return (
<<<<<<< HEAD
    <div style = {{maxWidth: '150px', maxHeight: '150px'}}>
      <Card>
        <Row>
          <Col md={1}>
            <div className = 'cardThumbnails_impact'>{props.singleCard.impact}/{props.singleCard.weight}</div>
=======
    <div style = {{width: '150px', height: '150px'}}>
      <Card style = {{width: '150px', height: '150px'}} className = 'CardThumbnailsSingleCard'>
        <Row>
          <Col md={1}>
            <div className = 'cardThumbnails_impact'>{props.singleCard.weight}/{props.singleCard.impact}</div>
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
          </Col>
          <Col md={9}>
            {props.singleCard.labels.map((label) => <div key = {Math.random()} style = {{paddingLeft: '5px', fontSize: '8px', color: 'blue'}}>{label}</div>)}
          </Col>
        </Row>
          <div style = {{fontSize: '10px', paddingLeft: '5px'}}>{props.singleCard.description}</div>
        <div>
<<<<<<< HEAD
          <Button className = 'CardThumbnails_userIcon float-right' variant='secondary'>GG</Button>
=======
          <Button className = 'CardThumbnails_userIcon float-right' variant='secondary'>GB</Button>
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
          <Button className = 'CardThumbnails_userIcon float-right' variant='secondary'>JI</Button>
        </div>
      </Card>
    </div>
  )
}
