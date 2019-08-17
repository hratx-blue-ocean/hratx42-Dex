import React, { useState } from 'react';
import {
  Navbar,
  Button,
  Form,
  DropdownButton,
  Dropdown,
  Alert,
  Modal,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import CardThumbnails from './CardThumbnails';

import http from '../../services/http/http';
import auth from '../../services/auth';
import global from '../../utils/global';

export default function Controls(props) {
  const [showModal, setShowModal] = useState(false);
  const [showInvite, showInviteToggler] = useState(false);
  const [invitationEmail, setInvitationEmail] = useState('');

  const cards = props.cards.slice(0, 10);
  const sendInvite = async () => {
    let userId = auth.getUser();
    let username;
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
        key={Math.random()}
        className="tableControlsNavBar"
        bg="dark"
        variant="dark"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div key={Math.random()} style={{ display: "flex", flexDirection: "row" }}>
          <Navbar.Brand key={Math.random()}>{props.tableName}</Navbar.Brand>
          <Form.Control
            key={Math.random()}
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
                {cards.map(item => (
                  <div key={Math.random()} className="ControlsSearchItem">
                    <div key={Math.random()} style={{ paddingLeft: '160px' }} />
                    <CardThumbnails
                      singleCard={item}
                      deckNames={props.deckNames}
                      users={props.users}
                      labels={props.labels}
                      background='true'
                      key={Math.random()}
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
                onClick={e => props.changeFilter(e)}
              >
                {user.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Button key={Math.random()} className="tableControlsAddDeckBtn" onClick={() => props.handleModal()} variant="success">
            Add Deck
          </Button>
          <Button
            className="tableControlDeleteButton"
            key={Math.random()}
            variant="outline-danger"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Delete
          </Button>
        </div>
        <ul
          key={Math.random()}
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
                      style={{ textAlign: "center" }}
                      className="tableControlsUserNameCircles"
                      variant="secondary"
                      key={Math.random()}
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
                    key={Math.random()}
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
          <li key={Math.random()} className="navbar-nav pull-right">
            <Button
              key={Math.random()}
              style={{ textAlign: "center" }}
              className="tableControlsUserNameCircles invite"
              variant="secondary"
              onClick={showInviteToggler}
            >
              <img src="/assets/LogoMakr_3QVBAS.png" height="25" />
            </Button>
          </li>
        </ul>
        <Modal key={Math.random()} show={showInvite} onHide={showInviteToggler}>
          <Modal.Header closeButton key={Math.random()}>
            <Modal.Title key={Math.random()}>Send Invitation</Modal.Title>
          </Modal.Header>
          <Modal.Body key={Math.random()}>
            <Form key={Math.random()}>
              <Form.Group key={Math.random()} controlId="formBasicEmail">
                <Form.Label key={Math.random()}>Email address</Form.Label>
                <Form.Control
                  key={Math.random()}
                  type="email"
                  placeholder="Enter email"
                  onBlur={(e) => {
                    setInvitationEmail(e.target.value)
                  }}
                />
                <Form.Text key={Math.random()} className="text-muted">
                  Enter the email you wish to invite!
                </Form.Text>
              </Form.Group>
              <Button key={Math.random()} variant="secondary" onClick={showInviteToggler}>
                Close
              </Button>
              <Button key={Math.random()} variant="primary" onClick={sendInvite}>
                Send
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Navbar>
      {showModal ? (
        <Alert key={Math.random()} variant="danger" className="controls__modal">
          Are you sure you want to delete this table?
          <Button
            key={Math.random()}
            variant="danger"
            onClick={() => {
              handleDelete(true);
            }}
          >
            Yes
          </Button>
          <Button
            key={Math.random()}
            variant="secondary"
            onClick={() => {
              handleDelete(false);
            }}
          >
            No
          </Button>
        </Alert>
      ) : null}
    </div>
  );
}
