const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password:{type: String, required: true, select: false},
    name: {type: String, require: true },
    contactNumber: {type: Number, require: true}
    
});


userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

userSchema.methods.validPassword = async function(candidatePassword) {
    const result = await bcrypt.compare(candidatePassword, this.password );
    return result;
};


const User = mongoose.model('User', userSchema);

module.exports = User;