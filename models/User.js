const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  starred_events: [String]
});

const user = mongoose.model("user", user_Schema);

module.exports = user;
