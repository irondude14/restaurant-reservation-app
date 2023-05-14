import './App.css';

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import LogIn from './components/LogIn';
import ReservationForm from './components/ReservationForm';
import Restaurant from './components/Restaurant';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<LogIn />} />
          <Route path='reservation' element={<ReservationForm />} />
          <Route path='restaurant/:id' element={<Restaurant />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
