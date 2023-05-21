import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('_session_id');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  console.log(user);

  function login(user) {
    setUser(user);
    localStorage.setItem('_session_id', JSON.stringify(user));
  }

  function logout() {
    setUser(null);
    navigate('/home');
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
