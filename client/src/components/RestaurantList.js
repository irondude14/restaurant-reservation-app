import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`/restaurants`)
      .then((r) => r.json())
      .then((data) => setRestaurants(data));
  }, []);

  const restaurantList = restaurants.map((r) => {
    return (
      <li key={r.id}>
        <Link to={`/restaurant/${r.id}`}>
          {r.name}

          <Outlet />
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h1>Restaurants:</h1>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default RestaurantList;
