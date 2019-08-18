import React from 'react';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function CardHeader(props) {
  const labels = [];
  let subLabels = [];
  for (let i = 0; i < props.labels.length; i++){
    subLabels.push(props.labels[i]);
    if ((i+1) % 3 === 0 && i > 1) {
      labels.push(subLabels);
      subLabels = [];
    }
    if (i === props.labels.length - 1 && i % 3 !== 0){
      labels.push(subLabels)
    }
  }
  return (
    <div>
      <Row className = 'no-gutters' style = {{ overflow: "hidden", paddingTop: '5px' }}>
        <Col md={3}>
          <div style = {{borderRadius: '20%'}} className='cardThumbnails_impact'>
          <OverlayTrigger
              key={'bottom'}
              placement={'bottom'}
              overlay={
                <Tooltip id={`tooltip-bottom`}>
                  Priority/Effort
                </Tooltip>}>
                <div>
                  <p style = {{position: 'relative', top: '-20px', left: '20px'}}>{props.impact}</p>
                  <p style = {{position: 'relative', top: '-3px', left: '0px'}}>{props.weight}</p>
                </div>
            </OverlayTrigger>
          </div>
        </Col>
        <Col className = 'no-gutters' md = {9}>
          {labels.map((subLabel) =>
            <Row key={Math.random()} className = 'no-gutters' style = {{paddingTop: '0px', paddingBottom: '0px'}}>
              {subLabel.map((label) => 
              <Col key={Math.random()} md = {4}>
                <div  style={{ height: '11px', fontSize: '7px', backgroundColor: `${label.color}`, borderRadius: '10%', color: `${label.color}` }}>
                  <p className = 'cardHeaderLabels'>{label.label_name}</p>
                </div>
              </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  )
}
