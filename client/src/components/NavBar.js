import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Button ,NavDropdown, Nav, Form} from 'react-bootstrap';
export default function NavBar(props) {
  return (
    <div>
      <div>
<Navbar bg="light" expand="lg">

  <Navbar.Brand href="Table" ><h2>Dex</h2></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    </Nav>
    <NavDropdown title="Table" id="collasible-nav-dropdown">
        <NavDropdown.Item href="Table"><Link to ={'/table'}>Table Page</Link></NavDropdown.Item>
        <NavDropdown.Item href="Table">Table</NavDropdown.Item>
        <NavDropdown.Item href="Table">Table</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="Table">Add a table</NavDropdown.Item>
      </NavDropdown>   
          <Form style={{marginRight: '25px' }}>
    <Button variant="outline-primary" className="mr-sm-2" >+</Button>
    </Form>
       <Form style={{marginRight: '25px' }}>
    <Button variant="outline-primary" className="mr-sm-2" >log in</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

  </div>
        <li><Link to={'/'}>Landing Page</Link></li>
        <li><Link to={'/profile'}>Profile Page</Link></li>
        <li><Link to ={'/dashboard'}>Dashboard Page</Link></li>
        <li><Link to ={'/table'}>Table Page</Link></li>
    </div>
  )
}
