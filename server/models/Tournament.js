const { Schema, model } = require("mongoose");

// const Course = require("./Course");
// const Hotel = require("./Hotel");
// const Player = require("./Player");

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
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    hotels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
    playersActive: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    playersWaitlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
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

const Tournament = model("Tournament", tourneySchema);

module.exports = Tournament;
