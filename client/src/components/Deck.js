import React from 'react';
import { Card } from 'react-bootstrap';
import CardThumbnail from './CardThumbnails'
import CardModal from './CardModal'

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
            <CardModal />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
