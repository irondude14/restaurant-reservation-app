import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const ReservationForm = () => {
  const [reservation, setReservation] = useState({
    name: '',
    date_time: '',
    guest_number: '',
  });

  const { user } = useContext(LoginContext);

  console.log(reservation);
  console.log(user);

  function handleChange(e) {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  if (user && user.reservations && user.restaurants) {
    return (
      <form onSubmit={handleSubmit}>
        <h3>ReservationForm</h3>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          value={reservation.name}
          name='name'
          onChange={handleChange}
        />
        <br />
        <label htmlFor='reservation-date-time'>Choose Date & Time:</label>
        <input
          type='datetime-local'
          value={reservation.date_time}
          name='date_time'
          onChange={handleChange}
        />
        <br />
        <label htmlFor='number-of-guests'>
          Number of Guests:
          <input
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
