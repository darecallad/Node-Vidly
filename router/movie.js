const express = require("express");
const { Genre } = require("../genre");
const { Movie, validateM } = require("../movies");
const router = express.Router();

router.get("/", async (req, res) => {
  const movie = await Movie.find().sour("name");
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send("Error");

  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validateM(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStack: req.body.numberInStack,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validateM(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStack: req.body.numberInStack,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) return res.status(400).send("Error");
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) res.status(400).send("Error");

  res.send(movie);
});

exports.router = router;
