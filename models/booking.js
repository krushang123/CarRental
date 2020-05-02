const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    car: {type: Schema.Types.ObjectId, ref: "car"},
    user:{type: Schema.Types.ObjectId, ref: "user"},
    bookedOn: {type: Date, default: Date.now()},
    issueOn: {type: Date, default: null, require: true},
    returnOn: {type: Date, default: null, require: true}
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;




