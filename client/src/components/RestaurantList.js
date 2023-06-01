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
      <li key={r.id} className='restaurant-card'>
        <Link to={`/restaurant/${r.id}`}>
          <h3>{r.name}</h3>
          <p>{r.description}</p>
          <p>
            <img src={r.image_url} alt='vesuvio' />
          </p>
        </Link>
      </li>
    );
  });

  return (
    <div className='home-page-container'>
      <h2>Restaurants:</h2>
      <ul className='restaurant-container'>{restaurantList}</ul>
    </div>
  );
};

export default RestaurantList;
