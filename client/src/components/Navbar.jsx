import React, { useContext } from 'react';
import Logo from '../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = currentUser && currentUser.isAdmin;

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='' />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/?cat=CodeCanvas' title='Explore Programming Languages'>
            <h3>CodeCanvas</h3>
          </Link>
          <Link className='link' to='/?cat=TechSphere' title='Learn about various technologies like AI, Big data, Block chain etc'>
            <h3>TechSphere</h3>
          </Link>
          <Link className='link' to='/?cat=GadJet' title='Information about Technology gadget'>
            <h3>GadJet</h3>
          </Link>
          <Link className='link' to='/?cat=XPlore' title='See what others say'>
            <h3>XPlore</h3>
          </Link>
          {currentUser && (
            <>
              <span>{currentUser.username}</span>
              <span onClick={logout}>Logout</span>
              <span className='write'>
                <Link className='link' to='/write'>
                  Write
                </Link>
              </span>
              {isAdmin && (
                <span className='write'>
                  <Link className='link' to='/admin'>
                    Admin
                  </Link>
                </span>
              )}
            </>
          )}
          {!currentUser && <Link className='link' to='/login'>Login</Link>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
