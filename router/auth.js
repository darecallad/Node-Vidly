const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const { User } = require("../user");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(true);
});

function validate(req) {
  const schema = {
    email: Joi.string().required().min(5).max(255),
    password: Joi.string().required().min(5).max(1024),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
