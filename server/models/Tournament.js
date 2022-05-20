const mongoose = require("mongoose");

const { Schema } = mongoose;
const Course = require("./Course");
const Hotel = require("./Hotel");
const Player = require("./Player");

const tourneySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    paymentDue: {
      type: String,
      required: true,
    },
    maxPlayers: {
      type: Number,
      required: true,
    },
    singlePrice: {
      type: Number,
      required: true,
    },
    doublePrice: {
      type: Number,
      required: true,
    },
    golfOnlyPrice: {
      type: Number,
      required: true,
    },
    courses: [Course.schema],
    hotels: [Hotel.schema],
    playersActive: [Player.schema],
    playersWaitlist: [Player.schema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

tourneySchema.virtual("activePlayerCount").get(function () {
  return this.playersActive.length;
});

const Tournament = mongoose.model("Tournament", tourneySchema);

module.exports = Tournament;
