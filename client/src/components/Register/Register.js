import React, { useState } from 'react';

//services
import http from '../../../services/http/__mocks__/http';

//utils
import global from '../../../utils/global';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = function(event) {
    event.preventDefault();
    //verify passwords match
    if(password1 !== password2){
      global.flash("Passwords should match", "danger", 2000)
    } else {
      //@TODO: verify email/password input
      http.postUser(email, password1)
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
        <label htmlFor={'register-password1'}>Password: </label>
        <input type="text" id="register-password1" value={password1} placeholder={'Password'}
        onChange={(event)=>{setPassword1(event.target.value)}}/>
        <label htmlFor={'register-password2'}>Confirm Password: </label>
        <input type="text" id="register-password2" value={password2} placeholder={'Password'}
        onChange={(event)=>{setPassword2(event.target.value)}} />
        <input type="submit" style={{display: "none"}} />
      </form>
    </div>
  );
}
