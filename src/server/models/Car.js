const mongoose = require("mongoose");

const { Schema } = mongoose;

const CarSchema = new Schema({
  _id: Schema.Types.ObjectId,
  make: {
      type: String
  },
  model: {
      type: String
  },
  year: {
      type: Number,
  },
  vin: {
      type: Number,
  },
    cars: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
  orders: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  }
});

module.exports = mongoose.model("Car", CarSchema);
