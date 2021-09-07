const mongoose = require("mongoose");
const Joi = require("joi");
const { genresSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    genre: { type: [genresSchema], required: true },
    numberInStack: { type: Number, required: true, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
  })
);

//validate function
function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(1).required(),
    genreId: Joi.string().required(),
    numberInStack: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  };
  return Joi.validate(movie, schema);
}

async function createMovie(title, genre, numberInStack, dailyRentalRate) {
  const movie = new Movie({
    title,
    genre,
    numberInStack,
    dailyRentalRate,
  });
  await movie.save();
}

async function updateMovie(movieId, movieTitle) {
  const movie = await Movie.findById(movieId);
  movie.title = movieTitle;
  movie.save();
}

async function deleteMovie(movieId) {
  const movie = await Movie.findById(movieId);
  movie.remove();
  movie.save();
}

exports.Movie = Movie;
exports.validateM = validateMovie;
