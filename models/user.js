const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    contactNumber: {type: Number, require: true}
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;