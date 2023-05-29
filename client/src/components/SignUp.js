import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { signup } = useContext(LoginContext);
  const navigate = useNavigate();

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

  return (
    <div>
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
        <input type='submit' value='Register' id='submitBtn' />
      </form>

      <ul>{errorsList}</ul>
    </div>
  );
};

export default SignUp;
