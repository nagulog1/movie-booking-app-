import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './Ticket.css';

const Ticket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketData = location.state;

  useEffect(() => {
    if (!ticketData) {
      navigate('/movies');
    }
  }, [ticketData, navigate]);

  if (!ticketData) {
    return null;
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Ticket download feature will be implemented with PDF generation');
  };

  const formatPaymentTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="ticket-container">
      <div className="ticket-success-banner">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>Your ticket has been generated successfully</p>
      </div>

      <div className="ticket-wrapper">
        <div className="ticket-card">
          <div className="ticket-header">
            <div className="ticket-logo">
              <span className="logo-icon">🎬</span>
              <span className="logo-text">CineBook</span>
            </div>
            <div className="ticket-id-section">
              <span className="ticket-id-label">Ticket ID</span>
              <span className="ticket-id-value">{ticketData.ticketId}</span>
            </div>
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-body">
            <div className="movie-section">
              <h2 className="movie-title">{ticketData.movieTitle}</h2>
              <p className="movie-language">{ticketData.movieLanguage || 'English'}</p>
            </div>

            <div className="ticket-details-grid">
              <div className="detail-item">
                <span className="detail-label">Theater</span>
                <span className="detail-value">{ticketData.theaterName}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Date & Time</span>
                <span className="detail-value">{ticketData.showDateTime}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Screen Type</span>
                <span className="detail-value screen-badge">{ticketData.screenType}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Seats</span>
                <span className="detail-value seats-list">{ticketData.seats}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Number of Seats</span>
                <span className="detail-value">{ticketData.numberOfSeats}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Total Amount Paid</span>
                <span className="detail-value amount">₹{ticketData.totalPrice}</span>
              </div>
            </div>

            <div className="payment-info">
              <p>Paid via {ticketData.paymentMethod.toUpperCase()} on {formatPaymentTime(ticketData.paymentTime)}</p>
            </div>
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-footer">
            <div className="qr-code-section">
              <div className="qr-code-placeholder">
                <QRCodeSVG 
                  value={JSON.stringify({
                    ticketId: ticketData.ticketId,
                    movieTitle: ticketData.movieTitle,
                    showDateTime: ticketData.showDateTime,
                    seats: ticketData.seats,
                    theater: ticketData.theaterName
                  })}
                  size={180}
                  level="H"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#0891b2"
                />
              </div>
              <p className="qr-instruction">Scan this QR code at the theater entrance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ticket-actions">
        <button onClick={handleDownload} className="action-btn download-btn">
          📥 Download Ticket
        </button>
        <button onClick={() => navigate('/my-bookings')} className="action-btn bookings-btn">
          📋 View My Bookings
        </button>
        <button onClick={() => navigate('/movies')} className="action-btn home-btn">
          🎬 Book Another Movie
        </button>
      </div>

      <div className="ticket-instructions">
        <h3>Important Instructions</h3>
        <ul>
          <li>Please arrive at the theater at least 15 minutes before the show time</li>
          <li>Carry a valid ID proof for verification</li>
          <li>Show this ticket (digital or printed) at the entrance</li>
          <li>Outside food and beverages are not allowed</li>
          <li>Ticket cancellation is subject to theater policy</li>
        </ul>
      </div>
    </div>
  );
};

export default Ticket;
