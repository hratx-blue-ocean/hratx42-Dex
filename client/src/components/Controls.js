import React, { useState } from 'react';
import { Navbar, Button, Form, DropdownButton, Dropdown, Alert, Modal, OverlayTrigger, Tooltip, Toast} from 'react-bootstrap';
import CardThumbnails from './CardThumbnails';

import http from '../../services/http/http';
import auth from '../../services/auth';
import global from '../../utils/global';

export default function Controls(props) {
  const [showModal, setShowModal] = useState(false);
  const [showInvite, showInviteToggler] = useState(false);
  const [invitationEmail, setInvitationEmail] = useState('');
  const [showInvitedToast, showInvitedToastTogger] = useState(false);

  const cards = props.cards.slice(0, 10);
  const sendInvite = async () => {
    let userId = auth.getUser();
    let username;
    showInviteToggler(false);
    showInvitedToastTogger(true);
    props.users.forEach((user) => user.id === userId ? username = user.name : null)
    let invitation = await http.invite.post(invitationEmail, { tableId: props.tableId, invitedBy: username });
    let { success, message } = invitation;
    global.flash(message, 'success', 2000);
  }
  const handleDelete = async function (sure) {
    setShowModal(false);
    if (sure) {
      const response = await http.tables.delete(props.tableId);
      if (response) {
        window.location = '/';
      }
    }
  };

  return (
    <div>
      <Navbar
        className="tableControlsNavBar"
        bg="dark"
        variant="dark"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Navbar.Brand >{props.tableName}</Navbar.Brand>
          <Form.Control
            style = {{width: '15%'}}
            onChange={e => props.searchText(e.target.value)}
            type="text"
            placeholder="Search cards"
            style={{ width: '25%' }}
            onBlur={() => props.loseFocusSearch()}
          />
          {props.searchName === '' ? (
            <></>
          )
            :
            (
              <div className="ControlsSearchItems row" key={Math.random()}>
                {props.cards.map(item => (
                  <div className="ControlsSearchItem">
                    <div style={{ paddingLeft: '160px' }} />
                    <CardThumbnails
                      singleCard={item}
                      deckNames={props.deckNames}
                      users={props.users}
                      labels={props.labels}
                      background='true'
                    />
                  </div>
                ))}
              </div>
            )}
          <DropdownButton
            className='tableControlsFilterBtn'
            id="dropdown-basic-button"
            variant="success"
            title={`${props.filterBy}`}
          >
            {props.users.map(user => (
              <Dropdown.Item
                className={props.filterBy === user.name ? 'ControlsfilterNames' : null}
                key={Math.random()}
                onClick={e => props.changeFilter(e)}>{user.name}</Dropdown.Item>
            ))}
          </DropdownButton>
          <Button className="tableControlsAddDeckBtn" onClick={() => props.handleModal()} variant="success">
            Add Deck
          </Button>
          <Button
            className="tableControlDeleteButton"
            variant="outline-danger"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Delete
          </Button>
        </div>
        <ul
          className="nav navbar-nav"
          style={{ float: "right", display: "flex", flexDirection: "row" }}>
          {props.users.map((user, count) => {
            if (count < 4) {
              return (
                <li key={Math.random()} className="navbar-nav pull-right">
                  <OverlayTrigger
                    placement={'bottom'}
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        {user.name}
                      </Tooltip>
                    }
                  >
                    <Button
                      key = {Math.random()}
                      style={{ textAlign: "center" }}
                      className="tableControlsUserNameCircles"
                      variant="secondary"
                    >
                      {(user.name.split(" ").map(char => char[0]).join("")).toUpperCase()}
                    </Button>
                  </OverlayTrigger>
                </li>
              )
            }
            return ('')
          }
          )}
          {
            props.users.length > 4
              ?
              <li key={Math.random()} className="navbar-nav pull-right">
                <OverlayTrigger
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      <ul style={{ listStyle: "none", padding: "0" }}>
                        {props.users.map(({ name }) =>
                          <li>{name}</li>
                        )}
                      </ul>
                    </Tooltip>
                  }
                >
                  <Button
                    style={{ textAlign: "center" }}
                    className="tableControlsUserNameCircles"
                    variant="secondary"
                  >
                    {props.users.length - 4}+
                  </Button>
                </OverlayTrigger>
              </li>
              :
              ''
          }
          <li className="navbar-nav pull-right">
            <Button
              style={{ textAlign: "center" }}
              className="tableControlsUserNameCircles invite"
              variant="secondary"
              onClick={showInviteToggler}
            >
              <img src="/assets/LogoMakr_3QVBAS.png" height="25" />
            </Button>
          </li>
        </ul>
        <Modal show={showInvite} onHide={showInviteToggler}>
          <Modal.Header closeButton key={Math.random()}>
            <Modal.Title ><div style={{textAlign: 'center'}}>Send Invitation</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onBlur={(e) => {
                    setInvitationEmail(e.target.value)
                  }}
                />
                <Form.Text className="text-muted">
                  Enter the email you wish to invite!
                </Form.Text>
              </Form.Group>
              <Button style={{float: 'right'}} variant="success" onClick={sendInvite}>
                Send
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Navbar>
      {showModal ? (
        <Alert variant="danger" className="controls__modal">
          Are you sure you want to delete this table?
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(true);
            }}
          >
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleDelete(false);
            }}
          >
            No
          </Button>
        </Alert>
      ) : null}
      <Toast
        style={{
          position: 'absolute',
          top: '180px',
          left: '0px',
          zIndex: 10
        }}
        onClose={() => showInvitedToastTogger(false)} 
        show={showInvitedToast} 
        delay={3000} 
        autohide
      >
        <Toast.Header>
          <img style={{width: '20px', height: '20px'}} src="/assets/favicon.png" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Invitation Sent!</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{`To: ${invitationEmail}`}</Toast.Body>
      </Toast>
    </div>
  );
}
