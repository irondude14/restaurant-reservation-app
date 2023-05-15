import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <h3>
          <Link to={`/restaurant/${r.id}`}>{r.name}</Link>
        </h3>
        <p>{r.description}</p>
        <p>
          <img src={r.image_url} alt='vesuvio' />
        </p>
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
