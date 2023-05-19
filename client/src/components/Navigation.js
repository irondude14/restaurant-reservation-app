import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const Navigation = () => {
  const { user, isLoggedIn } = useContext(LoginContext);

  console.log(isLoggedIn);

  if (isLoggedIn) {
    return (
      <div>
        <nav>
          <Link to='/home'>Home Page </Link>
          {/* <Link to='/login'>Log In </Link> */}
          {user.name}
        </nav>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div>
        <nav>
          <h3>Please Login or Signup</h3>
          <Link to='/home'>Home Page </Link>
          <Link to='/login'>Log In </Link>
        </nav>
        <Outlet />
      </div>
    );
  }
};

export default Navigation;
