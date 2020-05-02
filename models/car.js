const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new mongoose.Schema({
    vehicleNumber: { type: String, require: true},
    model: { type: String, required: true },
    seatingCapacity: { type: Number, required: true },
    rentPerDay: { type: Number, required:true},
    city: { type: String, required: true},
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
    
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;