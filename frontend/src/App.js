import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Movies from './pages/Movies';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Ticket from './pages/Ticket';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Movies />} />
            <Route 
              path="/booking/:movieId" 
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/payment" 
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/ticket" 
              element={
                <PrivateRoute>
                  <Ticket />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-bookings" 
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

const styles = {
  main: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#f8f9fa'
  }
};

export default App;
