const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/', auth, bookingController.createBooking);
router.get('/my-bookings', auth, bookingController.getMyBookings);
router.get('/:id', auth, bookingController.getBooking);
router.delete('/:id', auth, bookingController.cancelBooking);

// Admin routes
router.get('/', auth, bookingController.getAllBookings);

module.exports = router;
