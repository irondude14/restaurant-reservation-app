import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
};

export { LoginContext, LoginProvider };
