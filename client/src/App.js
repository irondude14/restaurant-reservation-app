import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import LogIn from './components/LogIn';
import ReservationForm from './components/ReservationForm';
import Restaurant from './components/Restaurant';
import SignUp from './components/SignUp';
import UsersPage from './components/UsersPage';
import UpdateReservationForm from './components/UpdateReservationForm';
import UpdateUserInfo from './components/UpdateUserInfo';
import RestaurantForm from './components/RestaurantForm';
import UpdateRestaurantForm from './components/UpdateRestaurantForm';
import { LoginProvider } from './context/LoginContext';

function App() {
  return (
    <div>
      <LoginProvider>
        <Navigation />
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<LogIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='userspage' element={<UsersPage />} />
          <Route path='reservation/:id' element={<ReservationForm />} />
          <Route
            path='updatereservation/:id'
            element={<UpdateReservationForm />}
          />
          <Route path='newrestaurant' element={<RestaurantForm />} />
          <Route
            path='updaterestaurant/:id'
            element={<UpdateRestaurantForm />}
          />
          <Route path='updateuser' element={<UpdateUserInfo />} />
          <Route path='restaurant/:id' element={<Restaurant />} />
        </Routes>
      </LoginProvider>
    </div>
  );
}

export default App;
