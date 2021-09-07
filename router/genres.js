const express = require("express");
const { Genre, validate } = require("../genre");
const router = express.Router();

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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// app.put

router.put("/:id", async (req, res) => {
  //Validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("Request 404");

  res.send(genre);
});

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

1;
