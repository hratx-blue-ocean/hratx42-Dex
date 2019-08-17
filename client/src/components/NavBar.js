import React from "react";
import { Link, withRouter } from "react-router-dom";
import TableSettings from './TableSettings';
import { Navbar, Button, NavDropdown, Nav, Form } from "react-bootstrap";
function NavBar(props) {
  let initial='';
  if(props.userName !== undefined){
    initial = props.userName.split(" ").map(char => char[0]).join("").toUpperCase()
  }
  
  const { history } = props;
  let allTables = props.tables.map((item) => <NavDropdown.Item key={Math.random()} onClick={() => history.push(`/table/${item.id}`)}>{item.name}</NavDropdown.Item>)
  return (

    <div>
      <Navbar bg="light" className='dexNavBar' expand="lg" >
        <Navbar.Brand >
          <Link style={{ color: 'black' }} to={"/dashboard"}><img src='/assets/Logo.png' alt='' style={{ marginLeft: "5px" }} height = '65'></img></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
          <Form style={{ marginRight: "45px" }}>
            <Button  className="navBarPlusCircle" style={{backgroundColor:'#FF5A5F', color:'#f1f0f0'}} onClick={() => props.changeTableModal()}>
              <strong>+</strong>
            </Button>
          </Form>
          <NavDropdown alignRight className="navBarUserCircle navBarDropdown" title={<img alt='' style={{color:'black',width: '28px',height:'28px'}} src='/assets/tableIcon.png'></img>} style={{ marginRight: "45px"}}>
            {allTables}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => props.changeTableModal()}>Create Table</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown alignRight className="navBarUserCircle navBarDropdown" title={initial} id="dropdown-menu" style={{  marginTop: ".125rem", marginRight: "40px", marginBottom: "0" }}>
              <div style = {{paddingLeft: '25px'}}><Link style = {{color: 'black', fontWeight: 'lighter'}} to={"/dashboard"}>Dashboard</Link></div>
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
