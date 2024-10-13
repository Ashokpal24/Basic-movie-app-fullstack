const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Movie = require("./model");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGO DB connected");
  })
  .catch((err) => {
    console.log("Error while connecting to MONGO DB ", err);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    if (movies.length > 0) {
      res.status(200).json(movies);
    } else {
      res.status(200).json({ message: "No data found for movies" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error occured while getting movies" });
  }
});

app.get("/api/movie/:id", async (req, res) => {
  // console.log(req.params);
  try {
    const movie = await Movie.findById(req.params.id);
    // console.log(movie);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res
        .status(200)
        .json({ message: `No data found for movie with id ${req.params.id}` });
    }
  } catch (error) {
    res.status(404).json({ message: "Error occured while getting movies" });
  }
});

app.get("/api/director_name_movie/:director_name", async (req, res) => {
  // console.log(req.params);
  try {
    const movies = await Movie.find({
      director_name: req.params.director_name,
    });
    // console.log(movies);
    if (movies.length > 0) {
      res.status(200).json(movies);
    } else {
      res.status(200).json({
        message: `No data found for movies with director name ${req.params.director_name}`,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "Error occured while getting movies :(" });
  }
});

app.get("/api/studio_name/:studio_name", async (req, res) => {
  // console.log(req.params);
  try {
    const movies = await Movie.find({
      studio_name: { $regex: req.params.studio_name, $options: "i" },
    });
    // console.log(movies);
    if (movies.length > 0) {
      res.status(200).json(movies);
    } else {
      res.status(200).json({
        message: `No data found for movies with studio name ${req.params.studio_name}`,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "Error occured while getting movies :(" });
  }
});

app.get("/api/collection_amt/:amount", async (req, res) => {
  try {
    const movies = await Movie.find({
      collection_amt: {
        $gte: parseInt(req.params.amount),
      },
    });
    // console.log(movies);
    if (movies.length > 0) {
      res.status(200).json(movies);
    } else {
      res.status(200).json({
        message: `No data found for movies for collection amount ${req.params.amount}`,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "Error occured while getting movies :(" });
  }
});

app.get("/api/movies_by_year/:year", async (req, res) => {
  try {
    const movies = await Movie.find({
      $and: [
        {
          release_date: {
            $gte: new Date(req.params.year, 0, 1),
          },
        },
        {
          release_date: {
            $lt: new Date(parseInt(req.params.year) + 1, 0, 1),
          },
        },
      ],
    });
    // console.log(movies);
    if (movies.length > 0) {
      res.status(200).json(movies);
    } else {
      res.status(200).json({
        message: `No data found for movies for year ${req.params.year}`,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "Error occured while getting movies :(" });
  }
});

app.post("/api/movie", async (req, res) => {
  // console.log(req.body);
  // res.status(200).json({ message: "gg" });
  const {
    movie_name,
    director_name,
    studio_name,
    collection_amt,
    release_date,
  } = req.body;
  console.log(req.body);
  const movie = new Movie({
    movie_name,
    director_name,
    studio_name,
    collection_amt,
    release_date,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(404).json({ message: "Error occured while adding movies" });
  }
});

app.put("/api/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    // console.log(movie);
    if (movie) {
      movie.movie_name = req.body.movie_name || movie.movie_name;
      movie.director_name = req.body.director_name || movie.director_name;
      movie.studio_name = req.body.studio_name || movie.studio_name;
      movie.collection_amt = req.body.collection_amt || movie.collection_amt;
      movie.release_date = req.body.release_date || movie.release_date;
    }
    const updatedMovie = await movie.save();
    res.status(201).json(updatedMovie);
  } catch (error) {
    res.status(404).json({ message: "Error occured while updating movies" });
  }
});

app.delete("/api/movie/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    console.log(deletedMovie);
    if (deletedMovie) {
      res.status(200).json({ message: "Movie deleted successfully" });
    } else {
      res
        .status(200)
        .json({ message: `No data found for movie with id ${req.params.id}` });
    }
  } catch (error) {
    res.status(404).json({ message: "Error occured while updating movies" });
  }
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
