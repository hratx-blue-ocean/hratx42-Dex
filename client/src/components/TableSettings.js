import React, { useState } from 'react';
import { Card, Button, Row, Col, Table, Form, Modal } from 'react-bootstrap';
//import styles from './tableSettings.module.css';

export default function TableSettings(props) {
  let addedPlayerToTable = props.addedPlayerToTable.map((item)=>{return(
   
  <tr>
    <th>{item}</th>
    <th onClick={()=>props.removePlayerToTable()} style = {{cursor: 'pointer'}}>x</th>
  </tr>)})
  const [tableName, setTableName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [descName, setDescName] = useState('');
  return (
    <Modal style = {{width: '650px',height: '600px'}} className = 'container' show={props.showTableModal}>
      <div >
        <Card>
          <div>
            <div style = {{fontSize: '30px',textAlign: 'center'}}>Create/Edit<Button style = {{borderRadius: '50%'}} onClick = {()=> props.changeTableModal()} className = {` float-right`} variant = 'light'>x</Button></div>
          </div>
          <hr/>
          <Row>
            <Col md = {{offset: 1}} style = {{paddingLeft: '10px'}}>
              <span>Table Name:</span>
              <div style = {{paddingTop: '10px'}}></div>
              <div>
                <input onChange = {(e) => setTableName(e.target.value)} value = {tableName} type="text" placeholder = 'Enter table name'/>
              </div>
              <div style = {{paddingTop: '10px'}}></div>
              <div>Description</div>
              <div style = {{paddingTop: '10px'}}></div>
              <textarea style = {{height: '50px'}} onChange = {(e) => setDescName(e.target.value)} value = {descName} type="text" placeholder = 'Enter table name'/>
              <div style = {{paddingTop: '10px'}}></div>
              <div>Invite Players</div>
              <div style = {{paddingTop: '10px'}}></div>
              <div>
                <input onChange = {(e) => setPlayerName(e.target.value)} type="email" name="emailaddress" placeholder = 'Enter user Email'/>
                <Button onClick = {() => props.addPlayerToTable(playerName)} style = {{position: 'relative',top: '-1px'}} size = 'sm' variant= 'success'>+</Button>
              </div>
              <div style = {{paddingTop: '10px'}}></div>
              <Button onClick = {() => props.addTable(tableName ,props.addedPlayerToTable)} variant= 'success'>Save</Button>
              <div style = {{paddingTop: '10px'}}></div>
            </Col>
            <Col>
              <span>Administrator(s): </span>
              <div style = {{paddingTop: '10px'}}></div>
              {/* map through administrators */}
              <div>{props.userName}</div>
              <div style = {{paddingTop: '10px'}}></div>
              <div>
                <Table size = 'sm'>
                  <thead>

                  </thead>
                  <tbody>
                    {/* map through all players */}
                    <tr>
                      {addedPlayerToTable}
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col md={1}></Col>
          </Row>
        </Card>
      </div>
    </Modal>
  )
}
