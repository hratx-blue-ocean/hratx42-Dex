import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

export default function TableThumbnails(props) {
  const backgroundColors = ['red', 'blue', 'green', 'pink', 'brown', 'yellow'];
  return (
    <Card style = {{height: '100px', width: '150px', backgroundColor: `${backgroundColors[Math.Floor(Math.random() * 5)]}`}}>
      <div>{props.table.title}</div>
    </Card>
  )
}
