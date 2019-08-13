import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
//services
import http from '../../../services/http/http.js'

//utils
import global from '../../../utils/global';

export default function Register() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = function(event) {
    event.preventDefault();
    console.log('asdad')
    //verify passwords match
    if(password1 !== password2){
      global.flash("Passwords should match", "danger", 2000)
    } else {
      //@TODO: verify email/password input
      let name = firstName + ' ' + lastName;
      http.users.post(name, email, password1).then((response) => {
        console.log('post response', response)
        http.auth.post(email, password1)
      })
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <label htmlFor={'register-email'}>Email: </label>
        <input
          type="text"
          id="register-email"
          value={email}
          placeholder={'Email'}
          onChange={(event) => {setEmail(event.target.value)}}
        />
        <label htmlFor={'register-first-name'}>First Name: </label>
        <input
          type="text"
          id="register-first-name"
          value={firstName}
          placeholder={'First Name'}
          onChange={(event) => {setFirstName(event.target.value)}}
        />
        <label htmlFor={'register-last-name'}>Last Name: </label>
        <input
          type="text"
          id="register-last-name"
          value={lastName}
          placeholder={'Last Name'}
          onChange={(event) => {setLastName(event.target.value)}}
        />
        <label htmlFor={'register-password1'}>Password: </label>
        <input type="text" id="register-password1" value={password1} placeholder={'Password'}
        onChange={(event)=>{setPassword1(event.target.value)}}/>
        <label htmlFor={'register-password2'}>Confirm Password: </label>
        <input type="text" id="register-password2" value={password2} placeholder={'Password'}
        onChange={(event)=>{setPassword2(event.target.value)}} />
        <Button onClick={(e) => handleSubmit(e)}>Sign up</Button>
      </form>
    </div>
  );
}
