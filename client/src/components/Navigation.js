import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <nav>
        <p>Sidebar:</p>
        <Link to='/home'>Home Page </Link>
        <Link to='/login'>Log In </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
