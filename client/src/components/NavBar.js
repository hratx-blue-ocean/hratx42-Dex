import React from "react";
import { Link } from "react-router-dom";
import TableSettings from './TableSettings';
import { Navbar,Button, NavDropdown, Nav, Form } from "react-bootstrap";
export default function NavBar(props) {
  let allTables = props.tables.map((item)=><NavDropdown.Item href="#action/3.3" onClick={()=>props.changeTable(item.id)}>{item.name}</NavDropdown.Item>)
  return (
    <div>
        <Navbar bg="light" expand="lg" >
          <Navbar.Brand href="#home" style={{ marginBottom: '22px' }}>
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
            <NavDropdown title="Tables" id="collasible-nav-dropdown">
              {allTables}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>props.changeTableModal()} href="#action/3.4">Create new table</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="user name" id="collasible-nav-dropdown" style={{ marginRight: "15px" }}>
            <NavDropdown.Item><Link to={"/dashboard"}>Dashboard</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout" onClick={()=>props.logOut()}>logout</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      <TableSettings showModal = {props.showTableModal} changeTableModal = {props.changeTableModal} />
    </div>
  );
}