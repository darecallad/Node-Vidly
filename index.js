const express = require("express");
const genres = require("./router/genres");
const home = require("./router/home");
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
app.use("/", home);
// app.listen
// environment viriables
// export PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));
