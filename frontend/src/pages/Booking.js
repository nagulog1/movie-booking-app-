import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { moviesAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Booking.css';

const Booking = () => {
  const { movieId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Generate dynamic showtimes based on movie
  const getShowtimesForMovie = (movie) => {
    if (!movie) return [];
    
    // Different theater configurations
    const theaterConfigs = [
      [
        { time: '09:30 AM', screen: 'IMAX 3D', priceMultiplier: 1.5 },
        { time: '12:45 PM', screen: '4DX ATMOS', priceMultiplier: 1.8 },
        { time: '03:15 PM', screen: 'DOLBY VISION', priceMultiplier: 1.3 },
        { time: '06:30 PM', screen: 'IMAX 3D', priceMultiplier: 1.5 },
        { time: '09:45 PM', screen: 'LASER 4K', priceMultiplier: 1.4 }
      ],
      [
        { time: '10:00 AM', screen: 'RGB ATMOS', priceMultiplier: 1.2 },
        { time: '01:30 PM', screen: '2K/DOLBY 7.1', priceMultiplier: 1.0 },
        { time: '04:45 PM', screen: 'IMAX 2D', priceMultiplier: 1.3 },
        { time: '07:15 PM', screen: 'RGB ATMOS', priceMultiplier: 1.2 },
        { time: '10:30 PM', screen: 'LASER 4K', priceMultiplier: 1.4 }
      ],
      [
        { time: '11:00 AM', screen: '4DX', priceMultiplier: 1.7 },
        { time: '02:00 PM', screen: 'DOLBY ATMOS', priceMultiplier: 1.3 },
        { time: '05:30 PM', screen: '4K ULTRA', priceMultiplier: 1.2 },
        { time: '08:00 PM', screen: 'IMAX 3D', priceMultiplier: 1.5 },
        { time: '11:15 PM', screen: '4DX', priceMultiplier: 1.7 }
      ],
      [
        { time: '09:00 AM', screen: 'DOLBY VISION', priceMultiplier: 1.3 },
        { time: '12:15 PM', screen: 'RGB ATMOS', priceMultiplier: 1.2 },
        { time: '03:45 PM', screen: 'LASER 4K', priceMultiplier: 1.4 },
        { time: '06:45 PM', screen: 'IMAX 2D', priceMultiplier: 1.3 },
        { time: '10:00 PM', screen: 'DOLBY ATMOS', priceMultiplier: 1.3 }
      ]
    ];

    // Use movie ID to select a theater config
    const configIndex = parseInt(movie._id.slice(-1), 16) % theaterConfigs.length;
    return theaterConfigs[configIndex];
  };

  // Theater info
  const theaterInfo = {
    name: 'PVR Cinemas',
    location: 'Anna Nagar'
  };

  // Format date for display
  const getFormattedDate = () => {
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[today.getDay()]}, ${String(today.getDate()).padStart(2, '0')} ${months[today.getMonth()]}, ${today.getFullYear()}`;
  };

  useEffect(() => {
    const loadMovie = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await moviesAPI.getById(movieId);
        setMovie(response.data.movie);
      } catch (err) {
        console.error('Failed to fetch movie:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadMovie();
  }, [movieId, token, navigate]);

  const handleSeatSelect = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedShowtime || selectedSeats.length === 0) {
      alert('Please select a showtime and seats');
      return;
    }

    // Calculate price with screen type multiplier
    const basePrice = selectedSeats.length * movie.price;
    const totalPrice = Math.round(basePrice * selectedShowtime.priceMultiplier);
    
    // Navigate to payment page with booking details
    navigate('/payment', {
      state: {
        movieId,
        movieTitle: movie.title,
        movieLanguage: movie.language,
        theaterName: `${theaterInfo.name}, ${theaterInfo.location}`,
        showDateTime: `${getFormattedDate()} | ${selectedShowtime.time}`,
        screenType: selectedShowtime.screen,
        seats: selectedSeats.join(', '),
        numberOfSeats: selectedSeats.length,
        totalPrice,
        bookingData: {
          movieId,
          seats: selectedSeats,
          showDate: showDate || new Date().toISOString().split('T')[0],
          showTime: `${selectedShowtime.time} - ${selectedShowtime.screen}`,
          totalPrice,
          theaterName: `${theaterInfo.name}, ${theaterInfo.location}`,
          screenType: selectedShowtime.screen
        }
      }
    });
  };

  if (loading) return <div className="booking-container"><p>Loading...</p></div>;
  if (!movie) return <div className="booking-container"><p>Movie not found</p></div>;

  const availableShowtimes = getShowtimesForMovie(movie);
  
  const seatSections = [
    { name: 'SuperStar', price: movie.price + 20, rows: ['A', 'B', 'C'], seatsPerRow: 14 },
    { name: 'Platinum', price: movie.price, rows: ['D', 'E', 'F', 'G', 'H'], seatsPerRow: 22 },
    { name: 'GoldStar', price: Math.max(120, movie.price - 20), rows: ['I', 'J'], seatsPerRow: 18 }
  ];

  const soldSeats = new Set(['A2', 'A4', 'A7', 'B3', 'B8', 'C1', 'C12', 'D6', 'D12', 'E10', 'E11', 'F4', 'F15', 'G2', 'G9', 'H7', 'I5', 'J3']);

  const renderSeatRow = (rowLabel, seatsPerRow) => {
    const leftBlock = Math.ceil(seatsPerRow / 2);
    const rightBlock = seatsPerRow - leftBlock;

    return (
      <div className="booking-seat-row" key={rowLabel}>
        <div className="booking-seat-block">
          {Array.from({ length: leftBlock }, (_, index) => {
            const seatNo = index + 1;
            const seatCode = `${rowLabel}${seatNo}`;
            const isSelected = selectedSeats.includes(seatCode);
            const isSold = soldSeats.has(seatCode);

            return (
              <button
                key={seatCode}
                type="button"
                onClick={() => handleSeatSelect(seatCode)}
                disabled={isSold}
                className={`booking-seat booking-seat-compact ${isSelected ? 'selected' : ''} ${isSold ? 'sold' : ''}`}
              >
                {seatNo}
              </button>
            );
          })}
        </div>

        <div className="booking-seat-aisle" />

        <div className="booking-seat-block">
          {Array.from({ length: rightBlock }, (_, index) => {
            const seatNo = leftBlock + index + 1;
            const seatCode = `${rowLabel}${seatNo}`;
            const isSelected = selectedSeats.includes(seatCode);
            const isSold = soldSeats.has(seatCode);

            return (
              <button
                key={seatCode}
                type="button"
                onClick={() => handleSeatSelect(seatCode)}
                disabled={isSold}
                className={`booking-seat booking-seat-compact ${isSelected ? 'selected' : ''} ${isSold ? 'sold' : ''}`}
              >
                {seatNo}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Select Your Seats - {movie.title}</h1>
      
      <div className="booking-content">
        <div className="booking-seat-section">
          {/* Theater Info Header */}
          <div className="booking-theater-info">
            <h2>{theaterInfo.name}: {theaterInfo.location} | {getFormattedDate()}</h2>
          </div>

          {/* Showtime Selection */}
          <div className="booking-showtime-section">
            <div className="booking-showtime-list">
              {availableShowtimes.map((showtime, index) => (
                <button
                  key={index}
                  type="button"
                  className={`booking-showtime-btn ${selectedShowtime?.time === showtime.time ? 'selected' : ''}`}
                  onClick={() => setSelectedShowtime(showtime)}
                >
                  <div className="showtime-time">{showtime.time}</div>
                  <div className="showtime-screen">
                    {showtime.screen}
                    {showtime.priceMultiplier > 1.0 && (
                      <span className="premium-badge"> +{Math.round((showtime.priceMultiplier - 1) * 100)}%</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <h3>Choose Seats</h3>
          <div className="booking-screen">SCREEN</div>

          <div className="booking-seat-map">
            {seatSections.map((section) => (
              <div className="booking-seat-tier" key={section.name}>
                <p className="booking-tier-label">₹{section.price} {section.name}</p>
                {section.rows.map((row) => renderSeatRow(row, section.seatsPerRow))}
              </div>
            ))}
          </div>

          <div className="booking-seat-legend">
            <span className="legend-item"><span className="legend-box available" /> Available</span>
            <span className="legend-item"><span className="legend-box selected" /> Selected</span>
            <span className="legend-item"><span className="legend-box sold" /> Sold</span>
          </div>

          <p className="booking-selected-seats">
            Selected: <strong>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <h3>Booking Summary</h3>
          
          <div className="booking-form-group">
            <label>Movie</label>
            <p>{movie.title}</p>
          </div>

          <div className="booking-form-group">
            <label>Theater</label>
            <p>{theaterInfo.name}, {theaterInfo.location}</p>
          </div>

          <div className="booking-form-group">
            <label>Show Date & Time</label>
            <p>{selectedShowtime ? `${getFormattedDate()} | ${selectedShowtime.time}` : 'Not selected'}</p>
            {selectedShowtime && <p className="showtime-screen-info">{selectedShowtime.screen}</p>}
          </div>

          <div className="booking-form-group">
            <label>Total Seats</label>
            <p>{selectedSeats.length}</p>
          </div>

          <div className="booking-form-group">
            <label>Total Price</label>
            <p className="booking-price">
              ₹{selectedShowtime 
                ? Math.round(selectedSeats.length * movie.price * selectedShowtime.priceMultiplier)
                : selectedSeats.length * movie.price}
            </p>
            {selectedShowtime && selectedShowtime.priceMultiplier !== 1.0 && (
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Base: ₹{selectedSeats.length * movie.price} × {selectedShowtime.priceMultiplier}x ({selectedShowtime.screen})
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={selectedSeats.length === 0 || !selectedShowtime}
            className="booking-submit-btn"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
