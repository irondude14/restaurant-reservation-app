import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { Link } from 'react-router-dom';

function UsersPage() {
  const { user, setUser } = useContext(LoginContext);

  function deleteReserv(id) {
    fetch(`/reservations/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(
      setUser((prevUser) => ({
        ...prevUser,
        reservations: prevUser.reservations.filter((r) => r.id !== id),
      }))
    );
  }

  function deleteRest(id) {
    fetch(`/restaurants/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(
      setUser((prevUser) => ({
        ...prevUser,
        owned_restaurants: prevUser.owned_restaurants.filter(
          (r) => r.id !== id
        ),
      }))
    );
  }

  if (user && user.reservations && user.owned_restaurants) {
    return (
      <div className='users-page-wrapper'>
        <div className='users-page-container'>
          {user.reservations.length === 0 ? (
            <h2>Here will be your reservations.</h2>
          ) : (
            <div>
              <h2>Your reservations:</h2>
              <ul>
                {user.reservations.map((reservation) => {
                  const { restaurant } = reservation;

                  return (
                    <li
                      key={reservation.id}
                      className='users-page-reservation-card'
                    >
                      {restaurant && (
                        <div>
                          <img
                            src={restaurant.image_url}
                            alt={restaurant.name}
                          />
                          <p>Restaurant: {restaurant.name}</p>
                          <p>Address: {restaurant.address}</p>
                          <p>Phone: {restaurant.phone}</p>
                        </div>
                      )}
                      <div>
                        <p>Name on a reservation: {reservation.name}</p>
                        <p>
                          Reservation time:{' '}
                          {new Date(reservation.date_time).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                            }
                          )}
                        </p>
                        <p>Number of guests: {reservation.guest_number}</p>
                        <button id='regularBtn'>
                          <Link to={`/updatereservation/${reservation.id}`}>
                            Update
                          </Link>
                        </button>
                        <button
                          id='regularBtn'
                          onClick={() => deleteReserv(reservation.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className='users-page-container'>
          {user.owned_restaurants.length === 0 ? (
            <div>
              <h2>Here will be your restaurants.</h2>
            </div>
          ) : (
            <div>
              <h2>Your restaurants:</h2>
              <ul>
                {user.owned_restaurants.map((rest) => {
                  return (
                    <li key={rest.id} className='users-page-restaurant-card'>
                      <div>
                        <h3>{rest.name}</h3>
                        <p>{rest.description}</p>
                        <img src={rest.image_url} alt={rest.name} />
                      </div>
                      <div>
                        <p>Address: {rest.address}</p>
                        <p>Phone: {rest.phone}</p>
                        <button id='regularBtn'>
                          <Link to={`/updaterestaurant/${rest.id}`}>Edit</Link>
                        </button>
                        <button
                          id='regularBtn'
                          onClick={() => deleteRest(rest.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  } else if (user && user.reservations) {
    return (
      <div className='users-page-container'>
        {user.reservations.length === 0 ? (
          <h2>Here will be your reservations.</h2>
        ) : (
          <div>
            <h2>Your reservations:</h2>
            <ul>
              {user.reservations.map((reservation) => {
                const { restaurant } = reservation;

                return (
                  <li key={reservation.id}>
                    <p>Name on a reservation: {reservation.name}</p>
                    <p>
                      Reservation time:{' '}
                      {new Date(reservation.date_time).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        }
                      )}
                    </p>
                    <p>Number of guests: {reservation.guest_number}</p>
                    {restaurant && (
                      <div>
                        <p>Restaurant: {restaurant.name}</p>
                        <img src={restaurant.image_url} alt={restaurant.name} />
                        <p>Address: {restaurant.address}</p>
                        <p>Phone: {restaurant.phone}</p>
                      </div>
                    )}
                    <button>
                      <Link to={`/updatereservation/${reservation.id}`}>
                        Update
                      </Link>
                    </button>
                    <button onClick={() => deleteReserv(reservation.id)}>
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Something went wrong. Please contact support.</h2>
      </div>
    );
  }
}

export default UsersPage;
