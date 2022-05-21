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
    match: [
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
      "Must match a valid website address",
    ],
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
