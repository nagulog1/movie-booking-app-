# Movie Booking Backend

Express.js API server with MongoDB for movie booking application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-booking
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Run server:
```bash
npm run dev  # Development
npm start   # Production
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - Token expiration time
- `NODE_ENV` - Environment (development/production)

## Project Structure

- `models/` - MongoDB schemas
- `routes/` - API endpoints
- `controllers/` - Business logic
- `middleware/` - Authentication and error handling

## API Documentation

See main README.md for full API documentation.
