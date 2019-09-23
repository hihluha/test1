const mongoose = require("mongoose");

const Customer = require("../models/Customers");
const Car = require("../models/Car");

exports.all = (req, res) => {
  Customer.find({}, (err, customers) => {
    if (err) throw err;
    console.log(customers);
    res.status(200).send(customers);
  })
      .sort({ firstName: -1 })
};

exports.new = (req, res) => {
  console.log(req.query.email);
  Customer.findOne({email: req.query.email}, (err, customer) => {
    if (err) throw err;
    console.log(customer);
    res.status(200).send([customer]);
  })
};

exports.saveCar = (req, res) => {

  const newCar = new Car({
    make: req.body.makeCar,
    model: req.body.modelCar,
    year: req.body.yearCar,
    vin: req.body.vinCar
  });

  Customer.findByIdAndUpdate(
      req.body.id,
      { $push: { cars: newCar } },
      { new: true },
      (err, updateCustomer) => {
        if (err) return res.send(err);
        res.send(updateCustomer);
      }
  );
};

exports.editCar = (req, res) => {
  Car.findByIdAndUpdate(
      req.body.id,
      {
        make: req.body.data.make,
        model: req.body.data.model,
        year: req.body.data.year,
        vin: req.body.data.vin
      },
      { new: true },
      (err, updateCar) => {
        if (err) return res.send(err);
        console.log(updateCar, "update");
        res.send(updateCar);
      }
  );
};

exports.deleteCar = (req, res) => {
  Car.findByIdAndDelete(req.query.id, (err, car) => {
    if (err) return res.send(err);
    res.send(car);
  });
};

exports.customer = (req, res) => {
  console.log(req.query.id);
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
      console.log(user, "user");
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
    // if (customer) return res.status(404).send("Email is existing");

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


