const mongoose = require("mongoose");

const { Schema } = mongoose;

const CarSchema = new Schema({
  make: {
    type: String
  },
  model: {
    type: String
  },
  year: {
    type: Number
  },
  vin: {
    type: Number
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  }
});

module.exports = mongoose.model("Car", CarSchema);
