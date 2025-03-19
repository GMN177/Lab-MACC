const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  userId: String,
  light: Number,
  humidity: Number,
  temperature: Number,
});

searchExport = mongoose.model("search", searchSchema);

module.exports = searchExport;
