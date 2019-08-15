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
  const [tableName, setTableName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [descName, setDescName] = useState('');
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
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Table Name:</Form.Label>
                  <Form.Control
                    onChange={e => setTableName(e.target.value)}
                    value={tableName}
                    type='text'
                    placeholder='Add table name'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    style={{ height: '50px' }}
                    onChange={e => setDescName(e.target.value)}
                    value={descName}
                    as='textarea'
                    rows='4'
                    placeholder='Add table description'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Invite Players:</Form.Label>
                  <Form.Control
                    onChange={e => setPlayerName(e.target.value)}
                    type='text'
                    placeholder='Add player'
                  />
                  <Button
                    onClick={() => props.newPlayer(playerName)}
                    className='tableSettingsAddPlayerBtn'
                    size='sm'
                    variant='success'
                  >
                    +
                  </Button>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Label>Administrator(s):</Form.Label>
                {/* map through administrators */}
                <div>Miles, Brian, Zona, DJ, Ibrahim, Hannah</div>
              </Form>
              <Table size='sm'>
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
                    <td>Brooke</td>
                    <td>
                      <Form.Check type='checkbox' />
                    </td>
                    <td style={{ cursor: 'pointer' }}>x</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.changeTableModal()} variant='success'>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
