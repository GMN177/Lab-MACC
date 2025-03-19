import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  userId: String,
  light: Number,
  humidity: Number,
  temperature: Number,
});

const Search = mongoose.model("Search", searchSchema);

export default Search;
