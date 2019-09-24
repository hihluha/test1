const mongoose = require("mongoose");

const Car = require("../models/Car");
const Order = require("../models/Order");


exports.cars = (req, res) => {

    Car.find({}, (err, customers) => {
        if (err) throw err;
        res.status(200).send(customers);
    })
};

exports.orders = (req, res) => {

    Order.find({}, (err, customers) => {
        if (err) throw err;
        res.status(200).send(customers);
    })
};
exports.saveOrder = (req, res) => {
    const newOrder = new Order({
        amount: req.body.amount,
        status: req.body.status,
        date_created: req.body.date_created,
        customer: mongoose.Types.ObjectId(req.body.customerID),
        cars: mongoose.Types.ObjectId(req.body.idCar),
    });

    newOrder
        .save()
        .then(order => res.json(order))
        .catch(err => res.send(err));
   // Customer.findByIdAndUpdate(
   //      {id: req.body.id},
   //      { $push: {orders: newOrder} } ,
   //      { new: true },
   //      (err, updateOrder) => {
   //          if (err) return res.send(err);
   //
   //          res.send(updateOrder);
   //      }
   //  );
};

exports.editOrder = (req, res) => {
    Order.findByIdAndUpdate(
        req.body.id,
        {
            amount: req.body.data.amount,
            status: req.body.data.status,
            date_created: req.body.data.date_created
        },
        { new: true },
        (err, updateOrder) => {
            if (err) return res.send(err);
            console.log(updateOrder, "update");
            res.send(updateOrder);
        }
    );
};

exports.deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.query.id, (err, car) => {
        if (err) return res.send(err);
        res.send(car);
    });
};
