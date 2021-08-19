const express = require("express");
const router = express.Router();

// app.get
router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;
