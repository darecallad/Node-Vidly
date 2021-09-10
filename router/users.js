const express = require("express");
const mongoose = require("mongoose");
const { User, validateU } = require("../user");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateU(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already existed");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
});

module.exports = router;
