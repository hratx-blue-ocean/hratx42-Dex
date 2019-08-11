import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  return (
    <div>
      <div>NavBar be here</div>
        <li><Link to={'/'}>Landing Page</Link></li>
        <li><Link to={'/profile'}>Profile Page</Link></li>
        <li><Link to ={'/boards'}>Boards Page</Link></li>
    </div>
  )
}
