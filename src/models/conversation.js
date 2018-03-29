"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;
// Schema defines how chat messages will be stored in MongoDB
var ConversationSchema = new Schema({
    participants: [{ type: ObjectId, ref: 'User' }]
});
exports.Conversation = mongoose.model('Conversation', ConversationSchema);
