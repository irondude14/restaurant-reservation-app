import React, { useContext, useState, useEffect } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

function UpdateUserInfo() {
  const { user, setUser } = useContext(LoginContext);
  const [errorsList, setErrorsList] = useState(null);
  const [updateInfo, setUpdateInfo] = useState({});
  const navigate = useNavigate();

  function updateUser(e) {
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateInfo),
    })
      .then((r) => r.json())
      .then((updatedUserInfo) => {
        if (!updatedUserInfo.errors) {
          setUser({
            ...user,
            ...updatedUserInfo,
          });
          navigate('/userspage');
        } else {
          setUpdateInfo({});
          const currentErrors = updatedUserInfo.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  useEffect(() => {
    setUpdateInfo(user || {});
  }, [user]);

  function handleUserInfo(e) {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={updateUser} className='form'>
      <h3>Update Account Info: </h3>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        name='name'
        value={updateInfo.name || ''}
        required
        onChange={handleUserInfo}
      />
      <br />
      <label htmlFor='email'>Email:</label>
      <input
        type='text'
        name='email'
        value={updateInfo.email || ''}
        required
        onChange={handleUserInfo}
      />
      <br />
      <input type='submit' value='Update' id='submitBtn' />
      {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
    </form>
  );
}

export default UpdateUserInfo;
