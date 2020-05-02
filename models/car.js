const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    vehicleNumber: { type: String, require: true},
    model: { type: String, required: true },
    seatingCapacity: { type: Number, required: true },
    rentPerDay: { type: Number, required:true},
    city: { type: String, required: true} 
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;