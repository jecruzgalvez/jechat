"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;
var MessageSchema = new Schema({
    conversationId: {
        type: ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});
exports.Messages = mongoose.model('Message', MessageSchema);
