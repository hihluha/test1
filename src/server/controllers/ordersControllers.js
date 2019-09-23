const mongoose = require("mongoose");

const Customer = require("../models/Customers");
const Car = require("../models/Car");
const Order = require("../models/Order");


exports.saveOrder = (req, res) => {
    const newOrder = new Order({
        amount: req.body.amount,
        status: req.body.status,
        date_created: req.body.date_created
    });

   Customer.findByIdAndUpdate(
        {id: req.body.id},
        { $push: {orders: newOrder} } ,
        { new: true },
        (err, updateOrder) => {
            if (err) return res.send(err);

            res.send(updateOrder);
        }
    );
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
