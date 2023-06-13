import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const LogIn = () => {
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: '',
  });
  // const [error, setError] = useState([]);

  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  function handleLogInInfo(e) {
    setLogInInfo({
      ...logInInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logInInfo),
    })
      .then((r) => r.json())
      .then((user) => {
        login(user);
        navigate('/home');
      });
  }

  return (
    <form className='form'>
      <h3>Log In:</h3>
      <label htmlFor='email'>Email:</label>
      <input
        type='text'
        value={logInInfo.email}
        name='email'
        onChange={handleLogInInfo}
      />
      <br />
      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        value={logInInfo.password}
        name='password'
        onChange={handleLogInInfo}
      />
      <br />
      <button id='submitBtn' type='submit' onClick={handleLogin}>
        Log In
      </button>
      <br />
      <Link to='/signup' className='signup'>
        SignUp
      </Link>
    </form>
  );
};

export default LogIn;
