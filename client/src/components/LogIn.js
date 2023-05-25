import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const LogIn = () => {
  // const [ownerFlag, setOwnerFlag] = useState(false);
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: '',
    // user_type: 'owner',
  });
  // const [error, setError] = useState([]);

  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  console.log(logInInfo.user_type);

  function handleLogInInfo(e) {
    setLogInInfo({
      ...logInInfo,
      [e.target.name]: e.target.value,
    });
  }

  // function handleFlag(e) {
  //   e.preventDefault();
  //   setOwnerFlag(!ownerFlag);
  //   setLogInInfo({
  //     ...logInInfo,
  //     user_type: ownerFlag ? 'owner' : 'user',
  //   });
  // }

  function handleLogin(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logInInfo),
    })
      .then((r) => r.json())
      .then((user) => {
        // if (user && user.owner) {
        //   const owner = { owner: user.owner };
        //   login(owner);
        //   navigate('/home');
        // } else if (user && user.user) {
        //   const client = { user: user.user };
        //   login(client);
        //   navigate('/home');
        // }
        login(user);
        navigate('/home');
      });
  }

  return (
    <form>
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
      <p>
        <button type='submit' onClick={handleLogin}>
          Log In
        </button>
      </p>
      {/* {ownerFlag ? (
        <p>
          <button type='submit' onClick={handleLogin}>
            User Log In
          </button>
          <button onClick={handleFlag}>Are you an Owner?</button>
        </p>
      ) : (
        <p>
          <button type='submit' onClick={handleLogin}>
            Owner Log In
          </button>
          <button onClick={handleFlag}>Are you a Client?</button>
        </p>
      )} */}
      <br />
      <button>
        <Link to='/signup'>Don't have an account?</Link>
      </button>
    </form>
  );
};

export default LogIn;
