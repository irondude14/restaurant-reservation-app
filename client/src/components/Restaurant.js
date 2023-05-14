import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then((r) => r.json())
      .then((data) => setRestaurant(data));
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <p>{restaurant.phone}</p>
      <img src={restaurant.image_url} alt={restaurant.name} />
      <p>
        <Link to='/reservation'>Make a Reservation</Link>
      </p>
    </div>
  );
};

export default Restaurant;
