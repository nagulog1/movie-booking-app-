const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  seats: [{
    type: String,
    required: true
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  showDate: {
    type: Date,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  theaterName: {
    type: String,
    default: 'PVR Cinemas'
  },
  screenType: {
    type: String,
    default: 'IMAX'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking'],
    default: 'card'
  },
  paymentTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
