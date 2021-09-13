const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const genres = require("./router/genre");
const movies = require("./router/movie");
const rentals = require("./router/rentals");
const users = require("./router/users");
const home = require("./router/home");
const auth = require("./router/auth");
const mongoose = require("mongoose");
const app = express();
// app.get, app.post, app.put, app.delete

//connect to Mongodb
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connect to MongoDB"))
  .catch((ex) => console.error("Cannot connect to MongoDB", ex));

// app.post use
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);
// app.listen
// environment viriables
// export PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));
