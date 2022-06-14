const mongoose = require("mongoose");

const { Schema } = mongoose;

const hotelchema = new Schema({
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
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Hotel = mongoose.model("Hotel", hotelchema);

module.exports = Hotel;
