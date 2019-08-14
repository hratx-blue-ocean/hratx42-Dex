import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
//services
import http from '../../../services/http/http.js';
//utils
import global from '../../../utils/global';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = function(event) {
    event.preventDefault();
    //verify passwords match
    if (password1 !== password2) {
      global.flash('Passwords should match', 'danger', 2000);
      //verify email/password/name input
    } else if (firstName && lastName && email && password1 && password2) {
      let name = firstName + ' ' + lastName;
      http.users
        .post(name, email, password1)
        .then(data => {
          if (data) {
            http.auth
              .post(email, password1)
              .then(loggedIn => {
                if (loggedIn) {
                  props.login();
                }
              })
              .catch(error => {
                console.log('error creating user and signing in', error);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      global.flash('Please enter all required fields', 'danger', 2000);
    }
  };

  return (
    <div id='register'>
      <h1>Dex lets you win at planning projects.</h1>
      <h3>Sign up - It's free and easy</h3>
      <Form onSubmit={event => handleSubmit(event)}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label htmlFor={'register-email'}>Email: </Form.Label>
          <Form.Control
            type='email'
            id='register-email'
            value={email}
            placeholder={'Email'}
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='formBasicFirstName'>
          <Form.Label htmlFor={'register-first-name'}>First Name: </Form.Label>
          <Form.Control
            type='text'
            id='register-first-name'
            value={firstName}
            placeholder={'First Name'}
            onChange={event => {
              setFirstName(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='formBasicLastName'>
          <label htmlFor={'register-last-name'}>Last Name: </label>
          <Form.Control
            type='text'
            id='register-last-name'
            value={lastName}
            placeholder={'Last Name'}
            onChange={event => {
              setLastName(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <label htmlFor={'register-password1'}>Password: </label>
          <Form.Control
            type='text'
            id='register-password1'
            value={password1}
            placeholder={'Password'}
            onChange={event => {
              setPassword1(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='formBasicConfirmPassword'>
          <label htmlFor={'register-password2'}>Confirm Password: </label>
          <Form.Control
            type='text'
            id='register-password2'
            value={password2}
            placeholder={'Password'}
            onChange={event => {
              setPassword2(event.target.value);
            }}
          />
        </Form.Group>

        <Button onClick={e => handleSubmit(e)}>Sign up</Button>
      </Form>
    </div>
  );
}
