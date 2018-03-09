"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
// User schema
var userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
});
exports.User = mongoose.model('User', userSchema);
