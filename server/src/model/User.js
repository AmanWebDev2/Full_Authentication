const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please provide unique username"],
        unique: [true,"Username Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
        select:false,
    },
    email: {
        type: String,
        required: [true, "Please proveide a unique email"],
        unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
});

UserSchema.pre("save",function(next) {
    // this -> current user data
    // encrypt password
    this.password = bcrypt.hashSync(this.password,10);
    this.profile = this.profile || ''
    next();
})


const User = mongoose.model('User',UserSchema);

// plural name
module.exports = mongoose.model.Users || User;