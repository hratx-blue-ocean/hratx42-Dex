import React from 'react';
import { Navbar, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import CardThumbnails from './CardThumbnails';

export default function Controls(props) {
  const cards = props.cards.slice(0, 10)
  return (
    <div>
      <Navbar bg = 'dark' variant= 'dark'>
        <Navbar.Brand>Dex</Navbar.Brand>
        <input onChange = {(e) => props.searchText(e.target.value)} type="text" placeholder = 'Search cards'/>
        {props.searchName === '' ? (<></>) : (
          <div className = 'ControlsSearchItems row'>
            {cards.map((item) => 
              <div key = {item} className = 'ControlsSearchItem'>
                <div style = {{paddingLeft: '160px'}}></div>
                <CardThumbnails onClick = {() => props.searchClick(item)} singleCard = {item} background = 'true'/>
              </div>)}
          </div>
        )}
        <Button style = {{height: '30px'}} variant = 'light'></Button>
        <div style = {{width: '50px'}}></div>
        <Button style = {{width: '120px'}} variant='success'>Sort</Button>
        <div style = {{paddingLeft: '10px'}}></div>
        <DropdownButton id="dropdown-basic-button" variant = 'success' title="Filter">
          {props.users.map((user) => 
            <Dropdown.Item onClick = {(e) => props.changeFilter(e)} href={user}>{user}</Dropdown.Item>)
          }
        </DropdownButton>
        <div style = {{position: 'relative', left: '30%'}}>
          {/* for each user, create button */}
          <Button style = {{borderRadius: '50%'}} variant='secondary'>US</Button>
          <Button style = {{borderRadius: '50%'}} variant='secondary'>ME</Button>
          <Button style = {{borderRadius: '50%'}} variant='secondary'>GG</Button>
          <Button style = {{width: '150px'}} variant='success'>Invite</Button>
        </div>
        
      </Navbar>
    </div>
  )
}
