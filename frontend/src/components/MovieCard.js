import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onBookClick }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <h3 className="movie-title">{movie.title}</h3>
      </div>
      <div className="movie-content">
        <div className="movie-detail">
          <strong>Genre:</strong> {movie.genre}
        </div>
        <div className="movie-detail">
          <strong>Director:</strong> {movie.director}
        </div>
        <div className="movie-rating">
          ⭐ {movie.rating}/10
        </div>
        <div className="movie-detail">
          <strong>Duration:</strong> {movie.duration} mins
        </div>
        <div className="movie-price">₹{movie.price}</div>
        <button 
          className="movie-book-btn"
          onClick={() => onBookClick(movie._id)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
