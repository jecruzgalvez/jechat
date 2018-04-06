"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
exports.ROLE_MEMBER = 'Member';
exports.ROLE_CLIENT = 'Client';
exports.ROLE_OWNER = 'Owner';
exports.ROLE_ADMIN = 'Admin';
// User schema
var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;
var userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        "enum": [exports.ROLE_MEMBER, exports.ROLE_CLIENT, exports.ROLE_OWNER, exports.ROLE_ADMIN],
        "default": exports.ROLE_MEMBER
    },
    stripe: {
        customerId: { type: String },
        subscriptionId: { type: String },
        lastFour: { type: String },
        plan: { type: String },
        activeUntil: { type: Date }
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    friends: [{ type: ObjectId, ref: 'User' }]
}, {
    timestamps: true
});
exports.User = mongoose.model('User', userSchema);
