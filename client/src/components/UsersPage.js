import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';

function UsersPage() {
  const [loggedUser, setLoggedUser] = useState([]);
  const { user } = useContext(LoginContext);

  useEffect(() => {
    if (user && user.owner && 'id' in user.owner) {
      fetch(`/owners/${user.owner.id}`)
        .then((r) => r.json())
        .then((owner) => {
          // Update the user state outside of the useEffect hook
          setLoggedUser(owner);
        });
    } else if (user && user.user && 'id' in user.user) {
      fetch(`/users/${user.user.id}`)
        .then((r) => r.json())
        .then((user) => {
          // Update the user state outside of the useEffect hook
          setLoggedUser(user);
        });
    } else {
      const storedUser = localStorage.getItem('_session_id');
      if (storedUser) {
        setLoggedUser(JSON.parse(storedUser));
      }
    }
  }, []);

  console.log(loggedUser);

  return <div>UsersPage</div>;
}

export default UsersPage;
