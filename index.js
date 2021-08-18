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
app.listen(3000, console.log("Listen on port 3000..."));

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
  movies.push(movies);
  res.send(movie);
});
