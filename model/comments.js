'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.Schema

var CommentsSchema = new Schema({
   author: String,
   text: String
});

module.exports = mongoose.model('Comment', CommentsSchema);