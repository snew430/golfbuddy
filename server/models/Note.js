const mongoose = require("mongoose");

const { Schema } = mongoose;

const noteSchema = new Schema({
  header: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
