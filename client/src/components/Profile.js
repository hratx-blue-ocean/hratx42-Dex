import React from 'react'
import {  Button , Form} from 'react-bootstrap';
export default function Profile(props) {
  return (
    <div style={{margin:'20px', border: '1px solid', width:'50%', hieght:'auto',borderRadius: '25px'}}>
<Form>
<Form.Group controlId="formGroupEmail" style={{marginRight:'auto', marginLeft:'auto', width:'60%', hieght:'auto'}}>
    <Form.Label >User Name</Form.Label>
    <Form.Control type="name" placeholder="Enter your name" />
  </Form.Group>
  <Form.Group controlId="formGroupEmail" style={{marginRight:'auto', marginLeft:'auto', width:'60%', hieght:'auto'}}>
    <Form.Label >Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter your email" />
  </Form.Group>
  <Form.Group controlId="formGroupPassword" style={{marginRight:'auto', marginLeft:'auto', width:'60%', hieght:'auto'}}>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group style={{marginRight:'auto', marginLeft:'auto', width:'60%', hieght:'auto'}}>
  <Button variant="outline-primary" className="mr-sm-2" >Save Changes</Button>
  </Form.Group>
</Form>
    </div>
  )
}
