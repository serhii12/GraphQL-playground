const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: 'Please Supply an email address',
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
