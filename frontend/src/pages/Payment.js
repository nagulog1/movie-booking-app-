import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bookingsAPI } from '../services/api';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!bookingData) {
      navigate('/movies');
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const generateTicketId = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TKT${timestamp}${random}`;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create booking in database
      await bookingsAPI.create(bookingData.bookingData);
      
      const ticketId = generateTicketId();
      
      // Navigate to ticket page with booking details and ticket ID
      navigate('/ticket', {
        state: {
          ...bookingData,
          ticketId,
          paymentMethod,
          paymentTime: new Date().toISOString()
        }
      });
    } catch (err) {
      alert('Payment failed: ' + (err.response?.data?.message || err.message));
      setProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <div className="payment-left">
          <h1 className="payment-title">Complete Your Payment</h1>
          
          <div className="payment-method-selector">
            <button
              type="button"
              className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <i className="card-icon">💳</i> Credit/Debit Card
            </button>
            <button
              type="button"
              className={`method-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <i className="upi-icon">📱</i> UPI
            </button>
            <button
              type="button"
              className={`method-btn ${paymentMethod === 'netbanking' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('netbanking')}
            >
              <i className="bank-icon">🏦</i> Net Banking
            </button>
          </div>

          <form onSubmit={handlePayment} className="payment-form">
            {paymentMethod === 'card' && (
              <>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                    className="payment-input"
                  />
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="payment-input"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                      className="payment-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength="3"
                      required
                      className="payment-input"
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'upi' && (
              <div className="form-group">
                <label>UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  required
                  className="payment-input"
                />
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="form-group">
                <label>Select Your Bank</label>
                <select required className="payment-input">
                  <option value="">Choose Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="payment-submit-btn"
            >
              {processing ? 'Processing Payment...' : `Pay ₹${bookingData.totalPrice}`}
            </button>
          </form>
        </div>

        <div className="payment-right">
          <div className="booking-summary-card">
            <h3>Booking Summary</h3>
            
            <div className="summary-item">
              <span className="summary-label">Movie</span>
              <span className="summary-value">{bookingData.movieTitle}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Theater</span>
              <span className="summary-value">{bookingData.theaterName}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Date & Time</span>
              <span className="summary-value">{bookingData.showDateTime}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Screen</span>
              <span className="summary-value">{bookingData.screenType}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Seats</span>
              <span className="summary-value">{bookingData.seats}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-item total">
              <span className="summary-label">Total Amount</span>
              <span className="summary-value">₹{bookingData.totalPrice}</span>
            </div>
          </div>

          <div className="payment-secure-info">
            <p>🔒 Your payment is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
