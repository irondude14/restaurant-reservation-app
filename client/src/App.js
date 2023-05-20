import './App.css';

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import LogIn from './components/LogIn';
import ReservationForm from './components/ReservationForm';
import Restaurant from './components/Restaurant';
import SignUp from './components/SignUp';
import UsersPage from './components/UsersPage';
import { LoginProvider } from './context/LoginContext';

function App() {
  return (
    <div className='App'>
      <LoginProvider>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='home' element={<Home />} />
            <Route path='login' element={<LogIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='userspage' element={<UsersPage />} />
            <Route path='reservation' element={<ReservationForm />} />
            <Route path='restaurant/:id' element={<Restaurant />} />
          </Route>
        </Routes>
      </LoginProvider>
    </div>
  );
}

export default App;
