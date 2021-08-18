const express = require("express");
const Joi = require("joi");

const app = express();
// app.get, app.post, app.put, app.delete

// app.post use
app.use(express.json());

// obj movies
const movies = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "AA" },
];

// app.listen
// environment viriables
// export PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));

// app.get
app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("The movie does not exist");

  res.send(movie);
});

// app.post

app.post("/api/movies", (req, res) => {
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

app.put("/api/movies/:id", (req, res) => {
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

app.delete("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie) return res.status(404).send("The movie is not exist");

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});
