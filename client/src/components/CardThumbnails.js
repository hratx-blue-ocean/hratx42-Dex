import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function CardThumbnails(props) {
  return (
    <div style = {{maxWidth: '150px', maxHeight: '150px'}}>
      <Card>
        <div className = 'container row'>
          <div style = {{border: '1px solid black', width: '35px', height: '35px', fontSize: '12px'}}>2/8</div>
        {/* map all lables to top of card */}
          <div className = 'float-right'>user story</div>
        </div>
        <div style = {{fontSize: '12px'}}>Implementing a user story where the user can press a button and a great thing happens</div>
        <div>
          <Button className = 'float-right' style = {{height: '35px', width: '35px', borderRadius: '25px'}} variant='secondary'>GG</Button>
          <Button className = 'float-right' style = {{height: '35px', width: '35px', borderRadius: '25px'}} variant='secondary'>JI</Button>
        </div>
      </Card>
    </div>
  )
}
