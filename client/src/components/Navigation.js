import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const Navigation = () => {
  const { user, logout } = useContext(LoginContext);

  const navigate = useNavigate();

  function logoutUser() {
    fetch('/logout').then(() => {
      logout();
      navigate('/home');
    });
  }

  // const userName = Object.keys(user);

  if (user) {
    return (
      <div>
        <nav>
          <h3>Hello {user.owner.name}</h3>
          <button>
            <Link to='/home'>Home Page </Link>
          </button>
          <button>
            <Link to='/userspage'>{user.owner.name}</Link>
          </button>
          <button onClick={logoutUser}>Log Out</button>
        </nav>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div>
        <nav>
          <button>
            <Link to='/home'>Home Page </Link>
          </button>
          <button>
            <Link to='/login'>Log In </Link>
          </button>
        </nav>
        <Outlet />
      </div>
    );
  }
};

export default Navigation;
