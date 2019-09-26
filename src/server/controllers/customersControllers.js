const mongoose = require("mongoose");

const Customer = require("../models/Customers");
const Car = require("../models/Car");

exports.all = (req, res) => {
  Customer.find({}, (err, customers) => {
    if (err) throw err;
    res.status(200).send(customers);
  })
      .sort({ firstName: -1 })
};

exports.new = (req, res) => {
  Customer.findOne({email: req.query.email}, (err, customer) => {
    if (err) throw err;
    res.status(200).send([customer]);
  })
};

exports.saveCar = (req, res) => {

  const newCar = new Car({
    make: req.body.makeCar,
    model: req.body.modelCar,
    year: req.body.yearCar,
    vin: req.body.vinCar,
    customer: mongoose.Types.ObjectId(req.body.customerID)
  });

  newCar.
  save()
      .then(car => res.json(car))
      .catch(err => res.send(err));
};

exports.customer = (req, res) => {
  Customer.findById({_id: req.query.id}, (err, customer) => {
    if (err) throw err;
    res.status(200).send([customer]);
  })
};

exports.search = (req, res) => {
  const findByValue = req.body;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  if (findByValue !== "") {
    Customer.find({ firstName, lastName }, (err, user) => {
      if (err) throw err;
      if (!user) return res.status(404).send("No customer found");
      if (user.length === 0) return res.status(404).send("No customer found");
      res.status(200).send(user);
    });
  }
};

exports.save = (req, res) => {
  Customer.findOne({ email: req.body.email }, (err, customer) => {
    if (err) throw err;
    if (customer) return res.status(404).send("Email is existing");

    const newCustomer = new Customer({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email
    });

    newCustomer
      .save()
      .then(customer => res.json(customer))
      .catch(err => res.send(err));
  });
};


