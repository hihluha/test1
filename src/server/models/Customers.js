const mongoose = require("mongoose");

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Customer", CustomerSchema);
