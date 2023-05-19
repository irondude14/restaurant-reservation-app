import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const SignUp = () => {
  const [errorsList, setErrorsList] = useState([]);
  const [ownerFlag, setOwnerFlag] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { signup } = useContext(LoginContext);

  function handleFlag(e) {
    e.preventDefault();
    setOwnerFlag(!ownerFlag);
  }

  function handleOwnerInfo(e) {
    setOwnerInfo({
      ...ownerInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleUserInfo(e) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  }

  function createUser(e) {
    e.preventDefault();
    const user = { user: userInfo };
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('User creation failed');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createOwner(e) {
    e.preventDefault();

    const owner = { owner: ownerInfo };
    fetch('/owners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(owner),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('Owner creation failed');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      {ownerFlag ? (
        <form onSubmit={createOwner}>
          <h3>Create Owner Account: </h3>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name' required onChange={handleOwnerInfo} />
          <br />
          <label htmlFor='email'>Email:</label>
          <input type='text' name='email' required onChange={handleOwnerInfo} />
          <br />
          <label htmlFor='password'>
            Password:
            <input
              type='password'
              name='password'
              required
              onChange={handleOwnerInfo}
            />
          </label>
          <br />
          <button onClick={handleFlag}>Create User Account Instead</button>
          <br />
          <input type='submit' value='Register' id='submitBtn' />
        </form>
      ) : (
        <form onSubmit={createUser}>
          <h3>Create User Account: </h3>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name' required onChange={handleUserInfo} />
          <br />
          <label htmlFor='email'>Email:</label>
          <input type='text' name='email' required onChange={handleUserInfo} />
          <br />
          <label htmlFor='password_confirmation'>
            Password:
            <input
              type='password'
              name='password'
              required
              onChange={handleUserInfo}
            />
          </label>
          <br />
          <button onClick={handleFlag}>Create Owner Account Instead</button>
          <br />
          <input type='submit' value='Register' id='submitBtn' />
        </form>
      )}
      <ul>{errorsList}</ul>
    </div>
  );
};

export default SignUp;
