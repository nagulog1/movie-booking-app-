import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-background">
        <div className="gradient-overlay"></div>
      </div>
      <div className="home-hero">
        <h1 className="home-title">Book Your Tickets Now</h1>
        <p className="home-subtitle">Experience cinema like never before</p>
        <button 
          className="home-button"
          onClick={() => navigate('/movies')}
        >
          Explore Movies
        </button>
      </div>
    </div>
  );
};

export default Home;
