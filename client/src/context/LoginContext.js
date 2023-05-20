import React, { createContext, useState, useEffect } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('_session_id');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user && user.owner && 'id' in user.owner) {
      fetch(`/owners/${user.owner.id}`)
        .then((r) => r.json())
        .then((owner) => {
          // Update the user state outside of the useEffect hook
          setUser(owner);
        });
    } else if (user && user.user && 'id' in user.user) {
      fetch(`/users/${user.user.id}`)
        .then((r) => r.json())
        .then((user) => {
          // Update the user state outside of the useEffect hook
          setUser(user);
        });
    } else {
      const storedUser = localStorage.getItem('_session_id');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  console.log(user);

  function login(user) {
    setUser(user);
    localStorage.setItem('_session_id', JSON.stringify(user));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('_session_id');
  }

  function signup(user) {
    setUser(user);
    localStorage.setItem('_session_id', JSON.stringify(user));
  }

  return (
    <LoginContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
