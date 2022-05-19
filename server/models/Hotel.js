const mongoose = require("mongoose");

const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  website: {
    type: String,
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
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
