# Quick Start Guide - Movie Booking Application

## 1️⃣ Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

## 2️⃣ Install Dependencies

```bash
# From project root
cd backend
npm install

cd ../frontend
npm install
```

## 3️⃣ Configure Backend

Create `.env` file in the `backend` folder:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-booking
JWT_SECRET=your_secure_secret_key_123
JWT_EXPIRE=7d
NODE_ENV=development
```

For MongoDB Atlas (cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-booking
```

## 4️⃣ Start the Application

Open TWO terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend runs on: `http://localhost:3000`

## 5️⃣ Add Sample Movies (Optional)

Use Postman or similar tool to create movies:

```
POST http://localhost:5000/api/movies
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Inception",
  "description": "A mind-bending thriller",
  "genre": "Sci-Fi",
  "duration": 148,
  "releaseDate": "2024-06-01",
  "director": "Christopher Nolan",
  "price": 12,
  "rating": 8.8,
  "cast": ["Leonardo DiCaprio", "Marion Cotillard"]
}
```

## 6️⃣ Test the Application

1. Open `http://localhost:3000`
2. Click "Register" to create a new account
3. Fill in name, email, and password
4. Browse movies
5. Click "Book Now" on a movie
6. Select date, time, and seats
7. Confirm booking
8. Check "My Bookings" to see your reservations

## 📁 Project Structure

```
movie booking/
├── backend/              # Express.js API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & error handling
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/            # React app
│   ├── public/          # Static files
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # UI components
│   │   ├── services/    # API client
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🚀 Available Routes

**Authentication:**
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`

**Movies:**
- Get all: `GET /api/movies`
- Get one: `GET /api/movies/:id`

**Bookings:**
- Create: `POST /api/bookings` (requires auth)
- View mine: `GET /api/bookings/my-bookings` (requires auth)

## 🔧 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or update connection string in `.env`

**Frontend can't reach backend:**
- Check backend is running on port 5000
- Update API URL in `frontend/src/services/api.js` if needed

**Port already in use:**
- Change PORT in `.env` for backend
- Or kill the process using the port

## 📚 Learn More

- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Guide](https://jwt.io)

Happy coding! 🎬
