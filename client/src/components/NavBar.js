import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import TableSettings from './TableSettings';
import { Navbar, Button, NavDropdown, Nav, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
function NavBar(props) {
  let initial='';
  if(props.userName !== undefined){
    initial = props.userName.split(" ").map(char => char[0]).join("").toUpperCase()
  }
  const { history } = props;
  let allTables = props.tables.map((item) => <NavDropdown.Item key={Math.random()} onClick={() => history.push(`/table/${item.id}`)}>{item.name}</NavDropdown.Item>)
  
  const toggleCreateTableOverlay = () => 
    (
      <div
        style={{
          display: 'inline',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          padding: '2px 10px',
          color: 'white',
          borderRadius: 3
        }}
      >
        Simple tooltip
      </div>
    )
  return (

    <div>
      <Navbar bg="light" className='dexNavBar' expand="lg" >
        <Navbar.Brand >
          <Link className="logoWrapper" style={{ color: 'black' }} to={"/dashboard"}><img id="logo" src="/assets/Logo.png" style={{ marginLeft: "5px", width: "150px" }}></img><img id="logoHover" src="/assets/LogoHover.png" style={{ marginLeft: "5px" }}></img></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
            <OverlayTrigger
              placement={'bottom'}
              delay={{ show: 200, hide: 200 }}
              overlay={                      
                <Tooltip id={`tooltip-bottom`}>
                  {'Create Table'}
                </Tooltip>}
              >
              <Form style={{ marginRight: "25px" }}>
                <Button className="navBarPlusCircle" onClick={() => props.changeTableModal()}>
                  <strong>+</strong>
                </Button>
              </Form>
            </OverlayTrigger>
            <NavDropdown  className="navBarUserCircle navBarDropdown" title={<img alt='' style={{width: '28px',height:'28px'}} src='/assets/imageHover.png'></img>} style={{ marginRight: "25px"}}>
                  {allTables}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => props.changeTableModal()}>Create Table</NavDropdown.Item>
            </NavDropdown>
          <NavDropdown className="navBarUserCircle navBarDropdown" title={initial} id="dropdown-menu-align-right" style={{  marginTop: ".125rem", marginRight: "0", marginBottom: "0" }}>
            <Link className={'dropdown-item'} style={{fontWeight: 'lighter'}} to={"/dashboard"}>Dashboard</Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => props.logOut()}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <TableSettings userName={props.userName} addTable={props.addTable} newPlayer={props.newPlayer} addPlayerToTable={props.addPlayerToTable} removePlayerToTable={props.removePlayerToTable} showTableModal={props.showTableModal} changeTableModal={props.changeTableModal} />
    </div>
  );
}

export default withRouter(NavBar)
