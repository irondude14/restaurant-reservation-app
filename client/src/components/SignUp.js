import React, { useState } from 'react';

const SignUp = () => {
  const [ownerFlag, setOwnerFlag] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  console.log(ownerInfo);

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
      .then((data) => {
        console.log(data);
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
          <label htmlFor='phone-number'>
            Phone:
            <input
              type='text'
              name='phone'
              required
              onChange={handleUserInfo}
            />
          </label>
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
    </div>
  );
};

export default SignUp;
