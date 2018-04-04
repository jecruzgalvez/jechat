"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var roles_1 = require("../constants/roles");
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
        "enum": [roles_1.ROLE_MEMBER, roles_1.ROLE_CLIENT, roles_1.ROLE_OWNER, roles_1.ROLE_ADMIN],
        "default": roles_1.ROLE_MEMBER
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
