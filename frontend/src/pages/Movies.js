import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { moviesAPI } from '../services/api';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await moviesAPI.getAll();
      setMovies(response.data.movies);
    } catch (err) {
      setError('Failed to load movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (movieId) => {
    navigate(`/booking/${movieId}`);
  };

  if (loading) return <div className="movies-container"><div className="movies-loading">Loading...</div></div>;
  if (error) return <div className="movies-container"><div className="movies-error">{error}</div></div>;

  return (
    <div className="movies-container">
      <div className="movies-header">
        <h1 className="movies-title">Now Showing</h1>
        <p className="movies-subtitle">{movies.length} movies available</p>
      </div>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard 
            key={movie._id} 
            movie={movie} 
            onBookClick={handleBookClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
