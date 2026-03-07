const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovie);

// Admin routes
router.post('/', auth, movieController.createMovie);
router.put('/:id', auth, movieController.updateMovie);
router.delete('/:id', auth, movieController.deleteMovie);

module.exports = router;
