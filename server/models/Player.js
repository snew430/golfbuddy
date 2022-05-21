const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      "Must enter a valid phone number",
    ],
  },
  preferredRoomate: {
    type: String,
  },
  lodging: {
    type: Number,
    required: true,
  },
});

//add paid to default false?

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
