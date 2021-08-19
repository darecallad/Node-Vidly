const express = require("express");
const Joi = require("joi");
const genres = require("./router/genres");
const home = require("./router/home");

const app = express();
// app.get, app.post, app.put, app.delete

// app.post use
app.use(express.json());
app.use("/api/movies", genres);
app.use("/", home);
// app.listen
// environment viriables
// export PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));
