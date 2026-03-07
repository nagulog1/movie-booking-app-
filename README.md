# Movie Booking Web Application

A full-stack movie booking application built with **React** (frontend) and **Express.js** with **MongoDB** (backend).

## Features

- **User Authentication**: Register and login with JWT tokens
- **Movie Listing**: Browse available movies with details (genre, director, rating, price)
- **Seat Booking**: Interactive seat selection with multiple show times
- **Booking Management**: View and cancel bookings
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
movie-booking/
├── backend/          # Express.js API server
│   ├── models/       # MongoDB schemas (User, Movie, Booking)
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth and error handlers
│   ├── server.js     # Express app setup
│   └── package.json
└── frontend/         # React web application
    ├── public/       # Static files
    ├── src/
    │   ├── pages/    # Route pages
    │   ├── components/ # Reusable components
    │   ├── services/ # API calls
    │   ├── context/  # Auth context
    │   ├── App.js    # Main app
    │   └── index.js  # Entry point
    └── package.json
```

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-booking
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev  # For development with nodemon
npm start   # For production
```

The API will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies` - Create movie (admin)
- `PUT /api/movies/:id` - Update movie (admin)
- `DELETE /api/movies/:id` - Delete movie (admin)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/my-bookings` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get booking details (protected)
- `DELETE /api/bookings/:id` - Cancel booking (protected)

## Default Credentials

After setting up MongoDB, you can add sample movies using the admin API or MongoDB client.

## Technologies Used

**Backend:**
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- CORS

**Frontend:**
- React
- React Router v6
- Axios
- Context API (for state management)

## Running Both Servers

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## Features Walkthrough

1. **Home Page**: Marketing page with link to browse movies
2. **Browse Movies**: View all available movies with filtering options
3. **User Authentication**: Register new account or login
4. **Book Seats**: Select show date, time, and seats from interactive seat map
5. **My Bookings**: View all user bookings with cancel option

## Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Email confirmation for bookings
- Admin dashboard for movie and booking management
- Rating and review system
- Multiple cinema halls support
- Real-time seat availability

## License

MIT License
