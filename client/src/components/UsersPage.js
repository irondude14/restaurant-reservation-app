import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

function UsersPage() {
  //   const [loggedUser, setLoggedUser] = useState([]);
  const { user, setUser } = useContext(LoginContext);

  //   useEffect(() => {
  //     if (user && user.owner && 'id' in user.owner) {
  //       fetch(`/owners/${user.owner.id}`)
  //         .then((r) => r.json())
  //         .then((owner) => {
  //           setLoggedUser(owner);
  //         });
  //     } else if (user && user.user && 'id' in user.user) {
  //       fetch(`/users/${user.user.id}`)
  //         .then((r) => r.json())
  //         .then((user) => {
  //           setLoggedUser(user);
  //         });
  //     } else {
  //       const storedUser = localStorage.getItem('_session_id');
  //       if (storedUser) {
  //         setLoggedUser(JSON.parse(storedUser));
  //       }
  //     }
  //   }, [user]);

  console.log(user);

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

  if (
    user &&
    // user.reservations &&
    user.reservations.length > 0
    // &&
    // user.restaurants
  ) {
    return (
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
                  {new Date(reservation.date_time).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
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
                <button>Edit</button>
                <button onClick={() => deleteReserv(reservation.id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (user && user.reservations.length === 0) {
    return <div>Here will be your reservations.</div>;
    // } else if (user && user.restaurants && user.restaurants.length > 0) {
    //   return (
    //     <div>
    //       <h3>Your restaurants:</h3>
    //       <ul>
    //         {user.restaurants.map((rest) => {
    //           return (
    //             <li key={rest.id}>
    //               <h3>{rest.name}</h3>
    //               <p>{rest.description}</p>
    //               <img src={rest.image_url} alt={rest.name} />
    //               <p>Address: {rest.address}</p>
    //               <p>Phone: {rest.phone}</p>
    //               <button>Edit</button>
    //               <button>Delete</button>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //       <button>Add a Restaurant</button>
    //     </div>
    //   );
    // } else if (user && user.restaurants && user.restaurants.length === 0) {
    //   return (
    //     <div>
    //       <h3>Here will be your restaurants.</h3>
    //       <button>Add a Restaurant</button>
    //     </div>
    //   );
  } else {
    return (
      <div>
        <h3>Something went wrong. Please contact support.</h3>
      </div>
    );
  }
}

export default UsersPage;
