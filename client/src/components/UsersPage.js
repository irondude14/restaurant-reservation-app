import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';

function UsersPage() {
  //   const [loggedUser, setLoggedUser] = useState([]);
  const { user } = useContext(LoginContext);

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

  return <div>UsersPage</div>;
}

export default UsersPage;
