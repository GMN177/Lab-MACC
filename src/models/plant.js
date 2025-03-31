import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  imgUrl: String,
  nations: [String],
  brightness: {
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

const Plant = mongoose.model("Plant", plantSchema);

export default Plant;
