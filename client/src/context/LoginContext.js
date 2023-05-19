import React, { createContext, useState, useEffect } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/show')
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, []);

  function login() {}

  function logout() {}

  function signup() {}

  return (
    <LoginContext.Provider value={{ user, login, logout, signup, isLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
