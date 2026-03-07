const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

const sampleMovies = [
  {
    title: 'Inception',
    description: 'A skilled thief who steals corporate secrets through dream-sharing technology',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    duration: 148,
    releaseDate: new Date('2010-07-16'),
    rating: 4.8,
    price: 250,
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Ellen Page'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Inception',
    isActive: true
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces his greatest challenge when a revolutionary criminal emerges',
    genre: 'Action',
    director: 'Christopher Nolan',
    duration: 152,
    releaseDate: new Date('2008-07-18'),
    rating: 4.9,
    price: 280,
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    posterUrl: 'https://via.placeholder.com/300x450?text=The+Dark+Knight',
    isActive: true
  },
  {
    title: 'Interstellar',
    description: 'A team of astronauts travel through a wormhole near Saturn in search of a new home',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    duration: 169,
    releaseDate: new Date('2014-11-07'),
    rating: 4.7,
    price: 300,
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Interstellar',
    isActive: true
  },
  {
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption',
    genre: 'Drama',
    director: 'Frank Darabont',
    duration: 142,
    releaseDate: new Date('1994-10-14'),
    rating: 4.9,
    price: 200,
    cast: ['Tim Robbins', 'Morgan Freeman'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Shawshank+Redemption',
    isActive: true
  },
  {
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales',
    genre: 'Crime',
    director: 'Quentin Tarantino',
    duration: 154,
    releaseDate: new Date('1994-10-14'),
    rating: 4.6,
    price: 220,
    cast: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
    isActive: true
  },
  {
    title: 'Avatar',
    description: 'A paraplegic Marine dispatched to the moon Pandora falls in love with a Na\'vi princess',
    genre: 'Sci-Fi',
    director: 'James Cameron',
    duration: 162,
    releaseDate: new Date('2009-12-18'),
    rating: 4.5,
    price: 320,
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Avatar',
    isActive: true
  },
  {
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man',
    genre: 'Drama',
    director: 'Robert Zemeckis',
    duration: 142,
    releaseDate: new Date('1994-07-06'),
    rating: 4.8,
    price: 210,
    cast: ['Tom Hanks', 'Sally Field', 'Gary Sinise'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Forrest+Gump',
    isActive: true
  },
  {
    title: 'The Matrix',
    description: 'A computer programmer discovers the truth about his reality and his role in it',
    genre: 'Sci-Fi',
    director: 'Lana Wachowski, Lilly Wachowski',
    duration: 136,
    releaseDate: new Date('1999-03-31'),
    rating: 4.6,
    price: 260,
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    posterUrl: 'https://via.placeholder.com/300x450?text=The+Matrix',
    isActive: true
  },
  {
    title: 'Gladiator',
    description: 'A former Roman General sets out to exact vengeance against an emperor who murdered his family',
    genre: 'Action',
    director: 'Ridley Scott',
    duration: 155,
    releaseDate: new Date('2000-05-05'),
    rating: 4.7,
    price: 270,
    cast: ['Russell Crowe', 'Joaquin Phoenix', 'Lucilla'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Gladiator',
    isActive: true
  },
  {
    title: 'The Lion King',
    description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne',
    genre: 'Animation',
    director: 'Jon Favreau',
    duration: 118,
    releaseDate: new Date('2019-07-09'),
    rating: 4.4,
    price: 240,
    cast: ['Donald Glover', 'Beyonté', 'James Earl Jones'],
    posterUrl: 'https://via.placeholder.com/300x450?text=The+Lion+King',
    isActive: true
  },
  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events, the Avengers assemble once more to reverse Thanos\'s actions',
    genre: 'Action',
    director: 'Anthony and Joe Russo',
    duration: 181,
    releaseDate: new Date('2019-04-26'),
    rating: 4.8,
    price: 350,
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Avengers+Endgame',
    isActive: true
  },
  {
    title: 'Titanic',
    description: 'A love story unfolds as the unsinkable ship Titanic sinks in the Atlantic Ocean',
    genre: 'Drama',
    director: 'James Cameron',
    duration: 194,
    releaseDate: new Date('1997-12-19'),
    rating: 4.5,
    price: 200,
    cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
    posterUrl: 'https://via.placeholder.com/300x450?text=Titanic',
    isActive: true
  }
];

async function seedMovies() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-booking');
    console.log('Connected to MongoDB');

    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    // Insert sample movies
    const result = await Movie.insertMany(sampleMovies);
    console.log(`✅ Successfully added ${result.length} movies to the database!`);
    
    console.log('\n📽️ Movies added:');
    result.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.genre}) - ₹${movie.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding movies:', error);
    process.exit(1);
  }
}

seedMovies();
