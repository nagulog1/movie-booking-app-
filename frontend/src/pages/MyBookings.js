import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../services/api';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
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

  const handleViewTicket = (booking) => {
    // Format booking data to match ticket component expectations
    const formatDateTime = (date, time) => {
      const bookingDate = new Date(date);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const dayName = days[bookingDate.getDay()];
      const day = bookingDate.getDate();
      const month = months[bookingDate.getMonth()];
      const year = bookingDate.getFullYear();
      
      return `${dayName}, ${String(day).padStart(2, '0')} ${month}, ${year} | ${time}`;
    };

    const ticketData = {
      ticketId: booking.ticketId,
      movieTitle: booking.movie?.title || 'Unknown Movie',
      movieLanguage: booking.movie?.language || 'English',
      theaterName: booking.theaterName || 'PVR Cinemas',
      showDateTime: formatDateTime(booking.showDate, booking.showTime),
      screenType: booking.screenType || 'IMAX',
      seats: booking.seats.join(', '),
      numberOfSeats: booking.seats.length,
      totalPrice: booking.totalPrice,
      paymentMethod: booking.paymentMethod || 'card',
      paymentTime: booking.paymentTime || booking.bookingDate
    };

    navigate('/ticket', { state: ticketData });
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
                  <div className="booking-detail-label">Ticket ID</div>
                  <div className="booking-detail-value">{booking.ticketId}</div>
                </div>
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
                <div className="booking-actions">
                  {booking.status === 'confirmed' && (
                    <>
                      <button 
                        onClick={() => handleViewTicket(booking)}
                        className="booking-view-ticket-btn"
                      >
                        View Ticket
                      </button>
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="booking-cancel-btn"
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
