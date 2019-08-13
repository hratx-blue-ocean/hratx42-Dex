import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button ,NavDropdown, Nav, Form, FormControl} from 'react-bootstrap';
export default function NavBar(props) {
  if(props.userid === ''){
    return (
      <div>
              <>
              <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home" style={{marginBottom: '22px', }}><h2>Dex</h2></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    </Nav>
    <Form style={{marginRight: '10px',marginBottom: '24px', }}>
    user name
      <FormControl type="text" placeholder="user name" className="mr-sm-2" />
    </Form>
        <Form style={{marginRight: '10px' }}>
    Password
      <FormControl type="password" placeholder="" className="mr-sm-2" />
      <small>Forgot Password?</small>
    </Form>
    <Form style={{marginRight: '25px' }}>
    <Button variant="outline-primary" className="mr-sm-2" >log in</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
    </>
          <li><Link to={'/'}>Landing Page</Link></li>
          <li><Link to={'/profile'}>Profile Page</Link></li>
          <li><Link to ={'/dashboard'}>Dashboard Page</Link></li>
          <li><Link to ={'/table'}>Table Page</Link></li>
      </div>
    )
  }else{
    return (
      <div>
              <>
  <Navbar bg="light" expand="lg">
  
    <Navbar.Brand href="#home" style={{marginBottom: '22px', }}><h2>Dex</h2></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <NavDropdown title="Tables" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">table 1</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">table 2</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">table 3</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Add a table</NavDropdown.Item>
        </NavDropdown>   
            <Form style={{marginRight: '25px' }}>
      <Button variant="outline-primary" className="mr-sm-2" >+</Button>
      </Form>
         <Form style={{marginRight: '25px' }}>
      <Button variant="outline-primary" className="mr-sm-2" >log in</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
    </>
          <li><Link to={'/'}>Landing Page</Link></li>
          <li><Link to={'/profile'}>Profile Page</Link></li>
          <li><Link to ={'/dashboard'}>Dashboard Page</Link></li>
          <li><Link to ={'/table'}>Table Page</Link></li>
      </div>
    )
  }
  
}
