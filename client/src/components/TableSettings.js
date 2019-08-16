import React, { useState } from 'react';
import {
  Container,
  Button,
  Row,
  Col,
  Table,
  Form,
  Modal
} from 'react-bootstrap';
//import styles from './tableSettings.module.css';

export default function TableSettings(props) {
  let newPlayer = props.newPlayer.map((item)=>{
    return(
      <tr>
        <th>{item}</th>
        <th onClick={()=>props.removePlayerToTable()} style = {{cursor: 'pointer'}}>x</th>
      </tr>
    )
  })
  const [tableName, setTableName] = useState('');
  const [playerName, setPlayerName] = useState('');
  return (
    <Modal show={props.showTableModal} centered>
      <Modal.Header
        closeButton
        onClick={() => props.changeTableModal()}
        className='createTableModalHeader'
      >
        <Modal.Title style={{ fontSize: '30px' }}>
          Create/Edit Table
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md = {{offset: 1}} style = {{paddingLeft: '10px'}}>
              <span>Table Name:</span>
              <div style = {{paddingTop: '10px'}}></div>
              <div>
                <input onChange = {(e) => setTableName(e.target.value)} value = {tableName} type="text" placeholder = 'Enter table name'/>
              </div>
              <div style = {{paddingTop: '10px'}}></div>
              <div style = {{paddingTop: '10px'}}></div>
              <div>Invite Players</div>
              <div style = {{paddingTop: '10px'}}></div>
              <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  props.addPlayerToTable(playerName)
                }}>
                <input onChange = {(e) => setPlayerName(e.target.value)} style = {{display: 'inline' ,width:'75%', marginRight:'5px'}} type="email" name="emailaddress" placeholder = 'Enter user Email'/>
                <Button
                  type="submit"
                  style = {{display: 'inline', position: 'relative',top: '-1px'}}
                  size="sm"
                  variant="success">
                    +
                </Button>
                </form>
              </div>
            </Col>
            <Col>
              <span>Creator: </span>
              <div style = {{paddingTop: '10px'}}></div>
              {/* map through administrators */}
              <div>{props.userName}</div>
              <div style = {{paddingTop: '10px'}}></div>
              <div>
                <Table size = 'sm'>
                  <thead>
                    Players
                  </thead>
                  <tbody>
                    {/* map through all players */}
                      {newPlayer}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => props.addTable(tableName, props.newPlayer)} variant="success">
            Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
