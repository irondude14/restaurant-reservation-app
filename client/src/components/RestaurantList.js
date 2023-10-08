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
    const uniqueReserv = new Set();

    if (r.users && r.users.length > 0) {
      r.users.forEach((user) => uniqueReserv.add(user.name));
    }
    const uniqueUserNames = Array.from(uniqueReserv);

    return (
      <li key={r.id} className='restaurant-card'>
        <Link to={`/restaurant/${r.id}`}>
          <h3>{r.name}</h3>
          <p>{r.description}</p>
          <p>
            <img src={r.image_url} alt={r.name} />
          </p>
        </Link>
        {uniqueUserNames.length > 0 ? (
          <div className='reservation-names-list'>
            <h4>Current reservations: </h4>
            <ul>
              {uniqueUserNames.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </li>
    );
  });

  return (
    <div className='home-page-container'>
      <ul className='restaurant-container'>{restaurantList}</ul>
    </div>
  );
};

export default RestaurantList;
