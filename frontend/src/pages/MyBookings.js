import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../services/api';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsAPI.getMyBookings();
      setBookings(response.data.bookings);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsAPI.cancel(bookingId);
        setBookings(bookings.filter(b => b._id !== bookingId));
      } catch (err) {
        setError('Failed to cancel booking');
      }
    }
  };

  if (loading) return <div className="my-bookings-container"><p>Loading...</p></div>;
  if (error) return <div className="my-bookings-container"><p style={{ color: 'var(--danger)' }}>{error}</p></div>;

  return (
    <div className="my-bookings-container">
      <h1 className="my-bookings-title">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="my-bookings-empty">
          <p>No bookings yet. Start booking your favorite movies!</p>
        </div>
      ) : (
        <div className="my-bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-card-header">
                <h2 className="booking-card-title">{booking.movie?.title}</h2>
                <span className={`booking-status ${booking.status === 'cancelled' ? 'cancelled' : ''}`}>
                  {booking.status}
                </span>
              </div>
              <div className="booking-card-details">
                <div className="booking-detail-item">
                  <div className="booking-detail-label">Date</div>
                  <div className="booking-detail-value">
                    {new Date(booking.showDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="booking-detail-item">
                  <div className="booking-detail-label">Time</div>
                  <div className="booking-detail-value">{booking.showTime}</div>
                </div>
                <div className="booking-detail-item">
                  <div className="booking-detail-label">Seats</div>
                  <div className="booking-seats-tag">
                    {booking.seats.map((seat, idx) => (
                      <span key={idx} className="booking-seat-badge">{seat}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="booking-card-footer">
                <div className="booking-total-price">
                  Total: ₹{booking.totalPrice}
                </div>
                {booking.status === 'confirmed' && (
                  <button 
                    onClick={() => handleCancel(booking._id)}
                    className="booking-cancel-btn"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
