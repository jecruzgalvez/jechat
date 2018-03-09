"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");

// User schema
var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.User = mongoose.model('User', userSchema);
