import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useParams, useNavigate } from 'react-router-dom';

const ReservationForm = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const [errorsList, setErrorsList] = useState(null);
  const [reservation, setReservation] = useState({
    restaurant_id: id,
    name: '',
    date_time: '',
    guest_number: '',
  });

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
        if (!newReserv.errors) {
          setUser((prevUser) => ({
            ...prevUser,
            reservations: [...prevUser.reservations, newReserv],
          }));
          navigate('/userspage');
        } else {
          const currentErrors = newReserv.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  if (user && user.reservations) {
    return (
      <form onSubmit={handleSubmit} className='form'>
        <h3>Reservation Form</h3>
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
            min='1'
            max='6'
            value={reservation.guest_number}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type='submit' value='Reserve' id='submitBtn' />
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
      </form>
    );
  } else if (!user) {
    return (
      <div>
        <h3>Please LogIn</h3>
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
