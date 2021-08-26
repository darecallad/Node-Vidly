const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

//create Schema
const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

//create model
const Genre = mongoose.model("Genre", genresSchema);

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort("name");
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("The genre does not exist");

  res.send(genre);
});

// app.post`

router.post("/", async (req, res) => {
  //Validate
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// app.put

router.put("/:id", async (req, res) => {
  //Validate
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("Request 404");

  res.send(genre);
});

//validate function
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

//app.delete
//splice

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("The genre is not exist");

  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);
  // working with Array

  res.send(genre);
});

module.exports = router;
