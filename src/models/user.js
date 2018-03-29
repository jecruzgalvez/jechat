"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
// User schema
var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;
var userSchema = new Schema({
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
    },
    friends: [{ type: ObjectId, ref: 'User' }]
});
exports.User = mongoose.model('User', userSchema);
