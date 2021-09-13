const express = require("express");
const mongoose = require("mongoose");
const { Rental, validateR } = require("../rental");
const { Customer } = require("../customers");
const { Movie } = require("../movies");
const Fawn = require("fawn");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("name");
  res.send(rental);
});

router.post("/", async (req, res) => {
  const { error } = validateR(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
  //   return res.status(400).send("Invalid customer.");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("No Customer");

  // if (!mongoose.Types.ObjectId.isValid(req.body.movieId))
  //   return res.status(400).send("Invalid movie.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("No Movie");

  if (movie.numberInStock === 0) return res.status(400).send(" NO STOCK");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentaRate: movie.dailyRentaRate,
    },
  });

  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { Number: -1 } })
      .remove()
      .run();

    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

module.exports = router;
