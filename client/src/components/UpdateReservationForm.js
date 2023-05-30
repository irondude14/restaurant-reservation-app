import React, { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateReservationForm() {
  const { id } = useParams();
  const { user, setUser } = useContext(LoginContext);

  const navigate = useNavigate();
  const [updatedReserv, setUpdatedReservation] = useState({
    name: '',
    date_time: '',
    guest_number: '',
  });

  useEffect(() => {
    fetch(`/reservations/${id}`)
      .then((r) => r.json())
      .then((data) => setUpdatedReservation(data));
  }, [id]);

  function handleChange(e) {
    setUpdatedReservation({
      ...updatedReserv,
      [e.target.name]: e.target.value,
    });
  }

  function updateReservation(e) {
    e.preventDefault();
    fetch(`/reservations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReserv),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser({
          ...user,
          reservations: user.reservations.map((r) =>
            r.id === updatedReserv.id ? updatedReserv : r
          ),
        });
        navigate('/userspage');
      });
  }

  if (!updatedReserv) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={updateReservation} className='form'>
      <h3>Update your Reservation:</h3>
      <label htmlFor='name'>Name:</label>
      <input
        required
        type='text'
        value={updatedReserv.name}
        name='name'
        onChange={handleChange}
      />
      <br />
      <label htmlFor='reservation-date-time'>Choose Date & Time:</label>
      <input
        required
        type='datetime-local'
        value={updatedReserv.date_time}
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
          value={updatedReserv.guest_number}
          onChange={handleChange}
        />
      </label>
      <br />
      <input type='submit' value='Update' id='submitBtn' />
    </form>
  );
}

export default UpdateReservationForm;
