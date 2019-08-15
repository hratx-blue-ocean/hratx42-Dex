import React from 'react';
import { Navbar, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import CardThumbnails from './CardThumbnails';

export default function Controls(props) {
  const cards = props.cards.slice(0, 10);
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand>Table Name</Navbar.Brand>
        <input
          onChange={e => props.searchText(e.target.value)}
          type='text'
          placeholder='Search cards'
        />
        {props.searchName === '' ? (
          <></>
        ) : (
          <div className='ControlsSearchItems row'>
            {cards.map(item => (
              <div key={Math.random()} className='ControlsSearchItem'>
                <div style={{ paddingLeft: '160px' }} />
                <CardThumbnails
                  onClick={() => props.searchClick(item)}
                  singleCard={item}
                  background='true'
                />
              </div>
            ))}
          </div>
        )}
        <Button style={{ height: '30px' }} variant='light' />
        <div style={{ width: '50px' }} />
        <div style={{ paddingLeft: '2px' }} />
        <DropdownButton
          id='dropdown-basic-button'
          variant='success'
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
          <Button onClick={() => props.handleModal()} variant='success'>
            New Deck
          </Button>
          {/* for each user, create button */}
          <Button className='tableControlsUserNameCircles' variant='secondary'>
            US
          </Button>
          <Button className='tableControlsUserNameCircles' variant='secondary'>
            ME
          </Button>
          <Button className='tableControlsUserNameCircles' variant='secondary'>
            GG
          </Button>
          <Button
            style={{ width: '150px' }}
            variant='success'
            onClick={() => {
              console.log('clicked on invite a player to a table');
            }}
          >
            Invite
          </Button>
        </div>
      </Navbar>
    </div>
  );
}
