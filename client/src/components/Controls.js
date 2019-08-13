import React from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';

export default function Controls(props) {
  return (
    <div>
      <Navbar bg = 'dark' variant= 'dark'>
        <Navbar.Brand>Dex</Navbar.Brand>
        <input type="text" placeholder = 'Search cards'/>
        <Button style = {{height: '30px'}} variant = 'light'></Button>
        <div style = {{width: '50px'}}></div>
        <Button style = {{width: '120px'}} variant='success'>Sort</Button>
        <div style = {{paddingLeft: '10px'}}></div>
        <Button style = {{width: '120px'}} variant='success'>Filter</Button>
        <div style = {{position: 'relative', left: '30%'}}>
          {/* for each user, create button */}
          <Button style = {{borderRadius: '25px'}} variant='secondary'>US</Button>
          <Button style = {{borderRadius: '25px'}} variant='secondary'>ME</Button>
          <Button style = {{borderRadius: '25px'}} variant='secondary'>GG</Button>
          <Button style = {{width: '150px'}} variant='success'>Invite</Button>
        </div>
        
      </Navbar>
    </div>
  )
}
