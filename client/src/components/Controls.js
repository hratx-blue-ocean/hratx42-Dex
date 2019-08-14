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
              <div key = {Math.random()} className = 'ControlsSearchItem'>
                <div style = {{paddingLeft: '160px'}}></div>
                <CardThumbnails onClick = {() => props.searchClick(item)} singleCard = {item} background = 'true'/>
              </div>)}
          </div>
        )}
        <Button style = {{height: '30px'}} variant = 'light'></Button>
        <div style = {{width: '50px'}}></div>
        <div style = {{paddingLeft: '10px'}}></div>
        <DropdownButton id="dropdown-basic-button" variant = 'success' title={`${props.filterBy}`}>
          {props.users.map((user) => 
            <Dropdown.Item key = {Math.random()} onClick = {(e) => props.changeFilter(e)}>{user.name}</Dropdown.Item>)
          }
        </DropdownButton>
        <div style = {{position: 'relative', left: '30%'}}>
        <Button onClick = {()=>props.handleModal()} style = {{height: '75px', width: '75px'}} variant='success'>New Deck</Button>
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
