import React from 'react';
import { Link } from 'react-router-dom';
import img2 from '../img/wel.jpg';

const Welcome = () => {
  return (
    <div className='auth' style={{ backgroundImage: `url(${img2})` }}>
      <h2 style={{ color: 'white' }}>Welcome to TechNest</h2>
      <h2 style={{ color: 'white' }}>Are you ready to dive into Tech World?</h2>
      <h2 style={{ color: 'white' }}>Click here to start</h2>
      <Link to={`/`}>
      <button style={{ fontSize: '1.2em', padding: '10px 20px' }}>START</button>
      </Link>
      <p style={{ color: 'white' }}>If you find any inappropriate content, feel free to login and report</p>
      <p style={{ color: 'white' }}>To add post, you can register and login</p>
    </div>
  );
};

export default Welcome;
