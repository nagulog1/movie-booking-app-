const Movie = require('../models/Movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const { genre, sortBy } = req.query;
    
    let query = { isActive: true };
    
    if (genre) {
      query.genre = genre;
    }

    let movies = Movie.find(query);

    if (sortBy === 'rating') {
      movies = movies.sort({ rating: -1 });
    } else if (sortBy === 'releaseDate') {
      movies = movies.sort({ releaseDate: -1 });
    } else if (sortBy === 'price') {
      movies = movies.sort({ price: 1 });
    }

    const result = await movies;

    res.status(200).json({
      success: true,
      count: result.length,
      movies: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single movie
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({
      success: true,
      movie
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create movie (Admin only)
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();

    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      movie
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update movie (Admin only)
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      movie
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete movie (Admin only)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
