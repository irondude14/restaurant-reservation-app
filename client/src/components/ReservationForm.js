import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useParams, useNavigate } from 'react-router-dom';

const ReservationForm = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const [reservation, setReservation] = useState({
    restaurant_id: id,
    name: '',
    date_time: '',
    guest_number: '',
  });

  console.log(reservation);
  console.log(id);

  function handleChange(e) {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    })
      .then((r) => r.json())
      .then((newReserv) => {
        setUser((prevUser) => ({
          ...prevUser,
          reservations: [...prevUser.reservations, newReserv],
        }));
        navigate('/userspage');
      });
  }

  if (user && user.reservations) {
    return (
      <form onSubmit={handleSubmit}>
        <h3>ReservationForm</h3>
        <label htmlFor='name'>Name:</label>
        <input
          required
          type='text'
          value={reservation.name}
          name='name'
          onChange={handleChange}
        />
        <br />
        <label htmlFor='reservation-date-time'>Choose Date & Time:</label>
        <input
          required
          type='datetime-local'
          value={reservation.date_time}
          name='date_time'
          onChange={handleChange}
        />
        <br />
        <label htmlFor='number-of-guests'>
          Number of Guests:
          <input
            required
            type='number'
            name='guest_number'
            value={reservation.guest_number}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type='submit' value='Reserve' id='submitBtn' />
      </form>
    );
  } else if (user && user.restaurants) {
    return (
      <div>
        <p>Please LogIn as Client</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Something went wrong. Please contact support.</p>
      </div>
    );
  }
};

export default ReservationForm;
