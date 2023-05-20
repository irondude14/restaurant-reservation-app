import React, { useContext } from 'react';
import RestaurantList from './RestaurantList';
import { LoginContext } from '../context/LoginContext';

const Home = () => {
  const { user } = useContext(LoginContext);

  if (user) {
    return (
      <div>
        <RestaurantList />
      </div>
    );
  } else {
    return (
      <div>
        <h3>Please Log In or Sign Up</h3>
        <RestaurantList />
      </div>
    );
  }
};

export default Home;
