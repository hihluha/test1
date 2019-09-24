const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    amount: {
        type: Number,
        // required: true
    },
    status: {
        type: String,
        // required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    cars: {
        type: Schema.Types.ObjectId,
        ref: "Cars"
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Order', OrderSchema);