import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const [ownerFlag, setOwnerFlag] = useState(false);
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: '',
    user_type: 'owner',
  });
  const [error, setError] = useState([]);

  function handleLogInInfo(e) {
    setLogInInfo({
      ...logInInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleFlag(e) {
    e.preventDefault();
    setOwnerFlag(!ownerFlag);
    setLogInInfo({
      ...logInInfo,
      user_type: ownerFlag ? 'owner' : 'user',
    });
  }

  return (
    <form>
      <h3>Log In:</h3>
      <label htmlFor='email'>Email:</label>
      <input type='text' name='email' onChange={handleLogInInfo} />
      <br />
      <label htmlFor='password'>Password:</label>
      <input type='text' name='password' onChange={handleLogInInfo} />
      <br />
      {ownerFlag ? (
        <p>
          <button type='submit'>User Log In</button>
          <button onClick={handleFlag}>Are you an Owner?</button>
        </p>
      ) : (
        <p>
          <button type='submit'>Owner Log In</button>
          <button onClick={handleFlag}>Are you a Client?</button>
        </p>
      )}
      <br />
      <button>
        <Link to='/signup'>Don't have an account?</Link>
      </button>
    </form>
  );
};

export default LogIn;
