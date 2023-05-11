import React, { useState, useEffect } from 'react';

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
        <h2>{r.name}</h2>
        <p>{r.address}</p>
        <p>{r.phone}</p>
        <img src={r.image_url} alt={r.name} />
      </li>
    );
  });

  return (
    <div>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default RestaurantList;
