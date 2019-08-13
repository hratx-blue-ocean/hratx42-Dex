import React from 'react';
import Register from './Register/Register.js';
import Login from './Login';

export default function Landing(props) {
  return (
    <div>
      <Login />
      Landing Page is here
      <Register />
    </div>
  );
}
