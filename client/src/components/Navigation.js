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

  function deleteAcc(id) {
    fetch(`/users/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(logout());
  }

  if (user) {
    return (
      <div className='navbar'>
        <nav>
          <h3>Hello {user.name.split(' ')[0]}!</h3>
          <button id='navbarBtn'>
            <Link to='/home'>Home Page </Link>
          </button>
          <button id='navbarBtn'>
            <Link to='/userspage'>{user.name}</Link>
          </button>
          <button id='navbarBtn'>
            <Link to={`/newrestaurant`}>Add a Restaurant</Link>
          </button>
          <button id='navbarBtn'>
            <Link to={`/updateuser`}>Update Your Info</Link>
          </button>
          <button onClick={() => deleteAcc(user.id)} id='navbarBtn'>
            Delete Account
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
          <h3>Please Log In or Sign Up</h3>
        </nav>
        <Outlet />
      </div>
    );
  }
};

export default Navigation;
