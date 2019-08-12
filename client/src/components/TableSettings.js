import React, { useState } from 'react'
import { Card, Button, Row, Col, Table, Form } from 'react-bootstrap';
import styles from '../modules/TableSettings.module.css';

export default function TableSettings(props) {
  const [tableName, setTableName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [descName, setDescName] = useState('');
  return (
    <div className = {`${styles.tableCreate} container`}>
      <Card>
        <div>
          <div className = {styles.header}>Create/Edit<Button className = {`${styles.buttonx} float-right`} variant = 'light'>x</Button></div>
        </div>
        <hr/>
        <Row>
          <Col md = {{offset: 1}} className = {styles.column}>
            <span>Table Name:</span>
            <div className = {styles.space}></div>
            <div>
              <input onChange = {(e) => setTableName(e.target.value)} type="text" placeholder = 'Enter table name'/>
            </div>
            <div className = {styles.space}></div>
            <div>Description</div>
            <div className = {styles.space}></div>
            <textarea className = {styles.description} onChange = {(e) => setDescName(e.target.value)} type="text" placeholder = 'Enter table name'/>
            <div className = {styles.space}></div>
            <div>Invite Players</div>
            <div className = {styles.space}></div>
            <div>
              <input onChange = {(e) => setPlayerName(e.target.value)} type="text" placeholder = 'Enter table name'/>
              <Button onClick = {() => props.newPlayer(playerName)} className = {styles.plusButton} size = 'sm' variant= 'success'>+</Button>
            </div>
            <div className = {styles.space}></div>
            <Button onClick = {() => props.saveTable(tableName, descName)} variant= 'success'>Save</Button>
            <div className = {styles.space}></div>
          </Col>
          <Col>
            <span>Administrator(s): </span>
            <div className = {styles.space}></div>
            {/* map through administrators */}
            <div>the dude</div>
            <div className = {styles.space}></div>
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
                    <td onClick = {() => {}} className = {styles.xbutton}>x</td>
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
