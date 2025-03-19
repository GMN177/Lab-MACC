const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  imgUrl: String,
  nations: [String],
  light: {
    min: Number,
    max: Number,
  },
  humidity: {
    min: Number,
    max: Number,
  },
  temperature: {
    min: Number,
    max: Number,
  },
});

plantExport = mongoose.model("plant", plantSchema);

module.exports = plantExport;
