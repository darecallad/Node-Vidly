const express = require("express");
const { Rental, validateR } = require("../rentals");
const { Customer } = require("../customers");
const { Movie } = require("../movies");

const router = express.Router();

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("name");
  res.send(rental);
});

router.post("/", async (req, res) => {
  const { error } = validateR(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("No Customer");

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

  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
});

module.exports = router;
