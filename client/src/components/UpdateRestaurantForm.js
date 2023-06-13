import React, { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateRestaurantForm() {
  const { id } = useParams();
  const { user, setUser } = useContext(LoginContext);

  const navigate = useNavigate();
  const [updatedRestaurant, setUpdatedRestaurant] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    price: '',
    image_url: '',
  });

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then((r) => r.json())
      .then((data) => setUpdatedRestaurant(data));
  }, [id]);

  function handleChange(e) {
    setUpdatedRestaurant({
      ...updatedRestaurant,
      [e.target.name]: e.target.value,
    });
  }

  function updateRestaurant(e) {
    e.preventDefault();
    fetch(`/restaurants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRestaurant),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser({
          ...user,
          owned_restaurants: user.owned_restaurants.map((r) =>
            r.id === updatedRestaurant.id ? updatedRestaurant : r
          ),
        });
        navigate('/userspage');
      });
  }

  if (!updatedRestaurant) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={updateRestaurant} className='form'>
      <h3>Update Restaurant</h3>
      <label htmlFor='name'>Name:</label>
      <input
        required
        type='text'
        value={updatedRestaurant.name}
        name='name'
        onChange={handleChange}
      />
      <br />
      <label htmlFor='address'>Address:</label>
      <input
        required
        type='text'
        value={updatedRestaurant.address}
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
          value={updatedRestaurant.description}
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
          value={updatedRestaurant.phone}
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
          value={updatedRestaurant.price}
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
          value={updatedRestaurant.image_url}
          onChange={handleChange}
        />
      </label>
      <br />
      <input type='submit' value='Update' id='submitBtn' />
    </form>
  );
}

export default UpdateRestaurantForm;
