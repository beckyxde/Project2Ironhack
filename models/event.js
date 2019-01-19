const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const event_Schema = new Schema({
 genre : String,
 venue: {club: String, district: String},
 artist  : String,
 date: Date,
 ticket: Boolean,
 price: Number
});

const event = mongoose.model('event', event_Schema);

module.exports = event;