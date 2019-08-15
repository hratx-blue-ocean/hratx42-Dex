import React from "react";
import { Link, withRouter } from "react-router-dom";
import TableSettings from './TableSettings';
import { Navbar,Button, NavDropdown, Nav, Form } from "react-bootstrap";
function NavBar(props) {
  const { history } = props;
  let allTables = props.tables.map((item)=><NavDropdown.Item onClick={() => history.push(`/table/${item.id}`)}>{item.name}</NavDropdown.Item>)
  return (
    <div>
        <Navbar bg="light" className='dexNavBar' expand="lg" >
          <Navbar.Brand  style={{ marginBottom: '22px' }}>
          <Link style={{color:'black'}} to={"/dashboard"}><h2 style={{ marginLeft: "15px"  }}>/Dex</h2></Link>
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
              <NavDropdown.Item onClick={()=>props.changeTableModal()}>Create Table</NavDropdown.Item>
            </NavDropdown>
          <NavDropdown title={props.userName} id="collasible-nav-dropdown" style={{ marginTop: ".125rem", marginRight: "15px", marginBottom: "0", marginLeft: "- 70px"}}>
            <NavDropdown.Item> <Link to={"/dashboard"}>Dashboard</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>props.logOut()}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      <TableSettings userName={props.userName} addTable={props.addTable} newPLayer={props.newPLayer} addPlayerToTable={props.addPlayerToTable} removePlayerToTable={props.removePlayerToTable} showTableModal = {props.showTableModal} changeTableModal = {props.changeTableModal} />
    </div>
  );
}

export default withRouter(NavBar)
