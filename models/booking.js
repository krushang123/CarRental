const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    car: {type: Schema.Types.ObjectId, ref: "Car"},
    user:{type: Schema.Types.ObjectId, ref: "User"},
    bookedOn: {type: Date, default: Date.now()},
    issueDate: {type: Date, require: true},
    returnDate: {type: Date, require: true}
});

const Booking = mongoose.model('Booking', bookingSchema);



module.exports = Booking;




