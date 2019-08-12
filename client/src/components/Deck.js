import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails'

export default function Deck(props) {
  return (
    <div style = {{width: '75%'}}>
      <div>
        <Card>
          <Card className="Header">User Stories</Card>
          <Card.Body className = 'row'>
            {/* map all cards that are included in this deck */}
            <CardThumbnail />
            <div style = {{paddingLeft: '20px'}}></div>
            <CardThumbnail />
            <div style = {{paddingLeft: '20px'}}></div>
            <CardThumbnail />
            <div style = {{paddingLeft: '20px'}}></div>
            <CardThumbnail />
            <div style = {{paddingLeft: '20px'}}></div>
            <Button style = {{height: '75px', width: '75px'}} variant='success'>Add New Card</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
