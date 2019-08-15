import React, { useState } from 'react';
import {
  Navbar,
  Button,
  DropdownButton,
  Dropdown,
  Alert,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import CardThumbnails from './CardThumbnails';

import http from '../../services/http/http';

export default function Controls(props) {
  const [showModal, setShowModal] = useState(false);

  const cards = props.cards.slice(0, 10);
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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>{props.tableName}</Navbar.Brand>
        <input
          onChange={e => props.searchText(e.target.value)}
          type="text"
          placeholder="Search cards"
        />
        {props.searchName === '' ? (
          <></>
        ) : (
            <div className="ControlsSearchItems row">
              {cards.map(item => (
                <div key={Math.random()} className="ControlsSearchItem">
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
        <Button style={{ height: '30px' }} variant="light" />
        <div style={{ width: '50px' }} />
        <div style={{ paddingLeft: '2px' }} />
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          title={`${props.filterBy}`}
        >
          {props.users.map(user => (
            <Dropdown.Item
              key={Math.random()}
              onClick={e => props.changeFilter(e)}
            >
              {user.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <div style={{ position: 'relative', left: '30%' }}>
          {props.users.map(user => 
            <>
              <OverlayTrigger
                key={'bottom'}
                placement={'bottom'}
                overlay={
                  <Tooltip id={`tooltip-bottom`}>
                    {user.name}
                  </Tooltip>
                }
              >
                <Button style = {{textAlign: "center"}}className="tableControlsUserNameCircles" variant="secondary">
                  {(user.name.split(" ").map(char => char[0]).join("")).toUpperCase()}
                </Button>
              </OverlayTrigger>
            </>
          )}
          <Button onClick={() => props.handleModal()} variant="success">
            New Deck
          </Button>
         
         
          {/* 
          <Button className="tableControlsUserNameCircles" variant="secondary">
            ME
          </Button>
          <Button className="tableControlsUserNameCircles" variant="secondary">
            GG
          </Button> */}
          <Button
            style={{ width: '150px' }}
            variant="success"
            onClick={() => {
              console.log('clicked on invite a player to a table');
            }}
          >
            Invite
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Delete
          </Button>
        </div>
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
    </div>
  );
}
