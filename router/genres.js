const express = require("express");
const router = express.Router();

// obj movies
const movies = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Horror" },
  { id: 3, genre: "Romance" },
];

router.get("/", (req, res) => {
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("The movie does not exist");

  res.send(movie);
});

// app.post

router.post("/", (req, res) => {
  const movie = {
    id: movies.length + 1,
    genre: req.body.genre,
  };

  //Validate
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  movies.push(movies);
  res.send(movie);
});

// app.put

router.put("/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("Request 404");

  //Validate
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  movie.genre = req.body.genre;
  res.send(movie);
});

//validate function
function validateMovie(movie) {
  const schema = {
    genre: Joi.string().min(3).required(),
  };
  return Joi.validate(movie, schema);
}

//app.delete
//splice

router.delete("/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie) return res.status(404).send("The movie is not exist");

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

module.exports = router;
