const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const playerSchema = new Schema({
  firstName: {
    type: String,
    // required: true,
    trim: true,
  },
  lastName: {
    type: String,
    // required: true,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
    unique: true,
  },
  preferredRoomate: {
    type: String,
  },
  lodging: {
    type: String,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

//add paid to default false?

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
