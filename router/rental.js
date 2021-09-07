const express = require("express");
const { Movie } = require("../movies");
const router = express.Router();

router.get("/", async (req, res) => {
  const movie = await Movie.find().sort("name");
  res.send(movie);
});
