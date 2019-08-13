import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default function Login(props) {
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home' style={{ marginBottom: '22px' }}>
          <h2>Dex</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto' />
          <Form
            style={{ marginRight: '10px', marginBottom: '24px' }}
            onChange={e => {
              console.log(e.target.value);
              // capture email address
            }}
          >
            Email
            <FormControl type='email' className='mr-sm-2' />
          </Form>
          <Form
            style={{ marginRight: '10px' }}
            onChange={e => {
              console.log(e.target.value);
              // capture password
            }}
          >
            Password
            <FormControl type='password' placeholder='' className='mr-sm-2' />
            <small>Forgot Password?</small>
          </Form>
          <Form style={{ marginRight: '25px' }}>
            <Button
              variant='success'
              className='mr-sm-2'
              onClick={() => {
                console.log('clicked log in');
                // send get request for user information to render dashboard
              }}
            >
              Log In
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
