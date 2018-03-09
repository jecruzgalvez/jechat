"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
// Article schema
var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});
exports.Article = mongoose.model('Article', articleSchema);
