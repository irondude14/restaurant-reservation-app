import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
      .then((r) => r.json())
      .then((user) => {
        if (!user.errors) {
          signup(user);
          navigate('/home');
        } else {
          setUserInfo({
            name: '',
            email: '',
            password: '',
          });
          const currentErrors = user.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
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
      .then((r) => r.json())
      .then((owner) => {
        if (!owner.errors) {
          signup(owner);
          navigate('/home');
        } else {
          setOwnerInfo({
            name: '',
            email: '',
            password: '',
          });
          const currentErrors = owner.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  return (
    <div>
      {ownerFlag ? (
        <form onSubmit={createOwner}>
          <h3>Create Owner Account: </h3>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            value={ownerInfo.name}
            required
            onChange={handleOwnerInfo}
          />
          <br />
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            value={ownerInfo.email}
            required
            onChange={handleOwnerInfo}
          />
          <br />
          <label htmlFor='password'>
            Password:
            <input
              type='password'
              name='password'
              value={ownerInfo.password}
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
          <input
            type='text'
            name='name'
            value={userInfo.name}
            required
            onChange={handleUserInfo}
          />
          <br />
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            value={userInfo.email}
            required
            onChange={handleUserInfo}
          />
          <br />
          <label htmlFor='password_confirmation'>
            Password:
            <input
              type='password'
              name='password'
              value={userInfo.password}
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
