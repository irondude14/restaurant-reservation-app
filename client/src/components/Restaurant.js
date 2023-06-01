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
    <div id='ind_rest'>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <p>{restaurant.address}</p>
      <p>{restaurant.phone}</p>
      <p>Price: {'$'.repeat(restaurant.price)}</p>
      <img src={restaurant.image_url} alt={restaurant.name} />
      <button id='submitBtn'>
        <Link to={`/reservation/${id}`}>Make a Reservation</Link>
      </button>
    </div>
  );
};

export default Restaurant;
