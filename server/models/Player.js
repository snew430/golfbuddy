const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const playerSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
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
