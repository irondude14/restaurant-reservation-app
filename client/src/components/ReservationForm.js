import React, { useState } from 'react';

const ReservationForm = () => {
  const [reservation, setReservation] = useState({
    name: '',
    date_time: '',
    guest_number: '',
  });

  console.log(reservation);

  function handleChange(e) {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

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
};

export default ReservationForm;
