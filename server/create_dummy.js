const mongoose = require("mongoose");
const Movie = require("./model");
const dotenv = require("dotenv");
dotenv.config();
const movies = [
  {
    movie_name: "Inception",
    director_name: "Christopher Nolan",
    studio_name: "Warner Bros.",
    collection_amt: 829895144,
    release_date: "2010-07-16",
  },
  {
    movie_name: "Avengers: Endgame",
    director_name: "Anthony Russo, Joe Russo",
    studio_name: "Marvel Studios",
    collection_amt: 2797800564,
    release_date: "2019-04-26",
  },
  {
    movie_name: "The Dark Knight",
    director_name: "Christopher Nolan",
    studio_name: "Warner Bros.",
    collection_amt: 1004558444,
    release_date: "2008-07-18",
  },
  {
    movie_name: "Titanic",
    director_name: "James Cameron",
    studio_name: "20th Century Fox",
    collection_amt: 2187463944,
    release_date: "1997-12-19",
  },
  {
    movie_name: "Jurassic Park",
    director_name: "Steven Spielberg",
    studio_name: "Universal Pictures",
    collection_amt: 1042751152,
    release_date: "1993-06-11",
  },
  {
    movie_name: "The Lion King",
    director_name: "Jon Favreau",
    studio_name: "Walt Disney Studios",
    collection_amt: 1656943394,
    release_date: "2019-07-19",
  },
  {
    movie_name: "Frozen II",
    director_name: "Chris Buck, Jennifer Lee",
    studio_name: "Walt Disney Animation Studios",
    collection_amt: 1450026933,
    release_date: "2019-11-22",
  },
  {
    movie_name: "Harry Potter and the Philosopher's Stone",
    director_name: "Chris Columbus",
    studio_name: "Warner Bros.",
    collection_amt: 974755371,
    release_date: "2001-11-16",
  },
  {
    movie_name: "Spider-Man: No Way Home",
    director_name: "Jon Watts",
    studio_name: "Marvel Studios",
    collection_amt: 1920941195,
    release_date: "2021-12-17",
  },
  {
    movie_name: "Avatar",
    director_name: "James Cameron",
    studio_name: "20th Century Fox",
    collection_amt: 2925743982,
    release_date: "2009-12-18",
  },
];
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGO DB connected");
  })
  .catch((err) => {
    console.log("Error while connecting to MONGO DB ", err);
  });

Movie.insertMany(movies)
  .then(() => {
    console.log("dummy data added");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting data:", err);
  });
