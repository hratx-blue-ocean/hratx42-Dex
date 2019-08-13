import React, { useState } from 'react';
import { Card, Button, Row, Col, Table, Form } from 'react-bootstrap';
//import styles from './tableSettings.module.css';

export default function TableSettings(props) {
  const [tableName, setTableName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [descName, setDescName] = useState('');
  return (
    <div style = {{width: '650px',height: '600px'}} className = 'container'>
      <Card>
        <div>
          <div style = {{fontSize: '30px',textAlign: 'center'}}>Create/Edit<Button style = {{borderRadius: '50%'}} className = {` float-right`} variant = 'light'>x</Button></div>
        </div>
        <hr/>
        <Row>
          <Col md = {{offset: 1}} style = {{paddingLeft: '10px'}}>
            <span>Table Name:</span>
            <div style = {{paddingTop: '10px'}}></div>
            <div>
              <input onChange = {(e) => setTableName(e.target.value)} type="text" placeholder = 'Enter table name'/>
            </div>
            <div style = {{paddingTop: '10px'}}></div>
            <div>Description</div>
            <div style = {{paddingTop: '10px'}}></div>
            <textarea style = {{height: '50px'}} onChange = {(e) => setDescName(e.target.value)} type="text" placeholder = 'Enter table name'/>
            <div style = {{paddingTop: '10px'}}></div>
            <div>Invite Players</div>
            <div style = {{paddingTop: '10px'}}></div>
            <div>
              <input onChange = {(e) => setPlayerName(e.target.value)} type="text" placeholder = 'Enter table name'/>
              <Button onClick = {() => props.newPlayer(playerName)} style = {{position: 'relative',top: '-1px'}} size = 'sm' variant= 'success'>+</Button>
            </div>
            <div style = {{paddingTop: '10px'}}></div>
            <Button onClick = {() => props.saveTable(tableName, descName)} variant= 'success'>Save</Button>
            <div style = {{paddingTop: '10px'}}></div>
          </Col>
          <Col>
            <span>Administrator(s): </span>
            <div style = {{paddingTop: '10px'}}></div>
            {/* map through administrators */}
            <div>the dude</div>
            <div style = {{paddingTop: '10px'}}></div>
            <div>
              <Table size = 'sm'>
                <thead>
                  <tr>
                    <th>Players</th>
                    <th>Edit Admin</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map through all players */}
                  <tr>
                    <td>brooke</td>
                    <td><Form.Check  type = 'checkbox'/></td>
                    <td style = {{cursor: 'pointer'}}>x</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Card>
    </div>
  )
}
