const mongoose = require("mongoose");

const { Schema } = mongoose;
const Course = require("./Course");
const Hotel = require("./Hotel");
const Player = require("./Player");

const tourneySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  courses: [Course.schema],
  hotels: [Hotel.schema],
  players: [Player.schema],
});

const Tournament = mongoose.model("Tournament", tourneySchema);

module.exports = Tournament;
