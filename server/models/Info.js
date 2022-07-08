const mongoose = require("mongoose");

const { Schema } = mongoose;

const infoSchema = new Schema({
  subject: {
    type: String,
  },
  header: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  place: {
    type: Number,
    required: true,
  },
});

const Info = mongoose.model("Info", infoSchema);

module.exports = Info;
