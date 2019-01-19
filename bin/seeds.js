const mongoose = require('mongoose');
const event = require('../models/event');

const dbName = 'Project2Ironhack';
mongoose.connect(`mongodb://localhost/${dbName}`);

const events = [
  {
    genre : "jazz",
    venue: {club: "wework", district: "Mitte"},
    artist  : "Becky",
    date: "02.01.2019",
    ticket: true,
    price: 20
   }]

event.create(events)
.then(() => (console.log('success')))