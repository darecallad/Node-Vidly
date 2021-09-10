const bcrypt = require("bcrypt");
const _ = require("lodash");
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

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  //joi-password-complexity
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // lodash
  const result = _.pick(user, ["name", "email"]);

  res.send(result);
});

module.exports = router;
