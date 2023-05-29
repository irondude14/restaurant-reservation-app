import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { Link } from 'react-router-dom';

function UsersPage() {
  const { user, setUser, logout } = useContext(LoginContext);

  function deleteAcc(id) {
    fetch(`/users/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(logout());
  }

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
      <>
        <div>
          <button>
            <Link to={`/newrestaurant`}>Add a Restaurant</Link>
          </button>
          <button>
            <Link to={`/updateuser`}>Update Your Info</Link>
          </button>
          <button onClick={() => deleteAcc(user.id)}>Delete Account</button>
        </div>
        {user.reservations.length === 0 ? (
          <div>
            <p>Here will be you reservations.</p>
          </div>
        ) : (
          <div>
            <h3>Your reservations:</h3>
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
        {user.owned_restaurants.length === 0 ? (
          <div>
            <p>Here will be you restaurants.</p>
          </div>
        ) : (
          <div>
            <h3>Your restaurants:</h3>
            <ul>
              {user.owned_restaurants.map((rest) => {
                return (
                  <li key={rest.id}>
                    <h3>{rest.name}</h3>
                    <p>{rest.description}</p>
                    <img src={rest.image_url} alt={rest.name} />
                    <p>Address: {rest.address}</p>
                    <p>Phone: {rest.phone}</p>
                    <button>
                      {' '}
                      <Link to={`/updaterestaurant/${rest.id}`}>Edit</Link>
                    </button>
                    <button onClick={() => deleteRest(rest.id)}>Delete</button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </>
    );
  } else if (user && user.reservations) {
    return (
      <>
        <div>
          <button>
            <Link to={`/updateuser`}>Update Your Info</Link>
          </button>
          <button onClick={() => deleteAcc(user.id)}>Delete Account</button>
        </div>
        {user.reservation.length === 0 ? (
          <div>
            <p>Here will be you reservations.</p>
          </div>
        ) : (
          <div>
            <h3>Your reservations:</h3>
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
      </>
    );
  } else {
    return (
      <div>
        <h3>Something went wrong. Please contact support.</h3>
      </div>
    );
  }
}

export default UsersPage;
