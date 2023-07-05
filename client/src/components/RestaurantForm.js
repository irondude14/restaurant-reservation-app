import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

function RestaurantForm() {
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const [errorsList, setErrorsList] = useState(null);
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    price: '',
    image_url: '',
  });

  function handleChange(e) {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurant),
    })
      .then((r) => r.json())
      .then((newRest) => {
        if (!newRest.errors) {
          setUser((prevUser) => ({
            ...prevUser,
            owned_restaurants: [...prevUser.owned_restaurants, newRest],
          }));
          navigate('/userspage');
        } else {
          const currentErrors = newRest.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  if (user) {
    return (
      <form onSubmit={handleSubmit} className='form'>
        <h3>Add a Restaurant:</h3>
        <label htmlFor='name'>Name:</label>
        <input
          required
          type='text'
          value={restaurant.name}
          name='name'
          onChange={handleChange}
        />
        <br />
        <label htmlFor='address'>Address:</label>
        <input
          required
          type='text'
          value={restaurant.address}
          name='address'
          onChange={handleChange}
        />
        <br />
        <label htmlFor='description'>
          Description:
          <input
            required
            type='text'
            name='description'
            value={restaurant.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor='phone'>
          Phone #:
          <input
            required
            type='text'
            name='phone'
            value={restaurant.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor='price'>
          Price (1 to 5):
          <input
            required
            type='text'
            name='price'
            min='1'
            max='5'
            value={restaurant.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor='image'>
          Photo:
          <input
            required
            type='text'
            name='image_url'
            value={restaurant.image_url}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type='submit' value='Add' id='submitBtn' />
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
      </form>
    );
  } else {
    return (
      <div>
        <p>Something went wrong. Please contact support.</p>
      </div>
    );
  }
}

export default RestaurantForm;
