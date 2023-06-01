import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const Navigation = () => {
  const { user, logout } = useContext(LoginContext);

  const navigate = useNavigate();

  function logoutUser() {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => {
      logout();
      navigate('/home');
    });
  }

  if (user) {
    return (
      <div className='navbar'>
        <nav>
          <h3>Hello {user.name}</h3>
          <button id='navbarBtn'>
            <Link to='/home'>Home Page </Link>
          </button>
          <button id='navbarBtn'>
            <Link to='/userspage'>{user.name}</Link>
          </button>
          <button id='navbarBtn' onClick={logoutUser}>
            Log Out
          </button>
        </nav>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className='navbar'>
        <nav>
          <button id='navbarBtn'>
            <Link to='/home'>Home Page </Link>
          </button>
          <button id='navbarBtn'>
            <Link to='/login'>Log In </Link>
          </button>
        </nav>
        <Outlet />
      </div>
    );
  }
};

export default Navigation;
