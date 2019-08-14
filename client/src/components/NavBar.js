import React from "react";
import { Link } from "react-router-dom";
import TableSettings from './TableSettings';
import { Navbar,Button, NavDropdown, Nav, Form } from "react-bootstrap";
export default function NavBar(props) {
  return (
    <div>
        <Navbar bg="light" expand="lg" >
          <Navbar.Brand href="#home" >
            <h2 style={{ marginLeft: "15px"  }}>Dex</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" />
            <Form style={{ marginRight: "25px" }}>
              <Button variant="outline-primary" className="mr-sm-2" onClick={()=>props.changeTableModal()}>
               <strong>+</strong>
              </Button>
            </Form>
            <Form style={{ marginRight: "25px" }}>
              <Button variant="outline-primary" className="mr-sm-2">
              <Link to={"/dashboard"}>Dashboard</Link>
              </Button>
            </Form>
            <NavDropdown title="Tables" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                <Link to={"/table"}>Table 1</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">table 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">table 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick = {()=>{}} href="#action/3.4">
                <Link to={"./TableSettings"}>Add a table</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="user name" id="collasible-nav-dropdown" style={{ marginRight: "15px" }}>
            <NavDropdown.Item href="#action/3.1">
                <Link to={"./dashboard"}>Dashboard</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <Link to={"/"} onClick={()=>props.logOut()}>logout</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      <TableSettings showModal = {props.showTableModal} changeTableModal = {props.changeTableModal} />
    </div>
  );
}
