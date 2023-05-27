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

  // let name;

  // if (user) {
  //   if (user.owner) {
  //     name = user.owner.name;
  //   } else if (user.user) {
  //     name = user.user.name;
  //   }
  // }

  // const userName = Object.keys(user);

  if (user) {
    return (
      <div>
        <nav>
          <h3>Hello {user.name}</h3>
          <button>
            <Link to='/home'>Home Page </Link>
          </button>
          <button>
            <Link to='/userspage'>{user.name}</Link>
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
