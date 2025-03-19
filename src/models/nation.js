import mongoose from "mongoose";
import "mongoose-geojson-schema";

const nationSchema = new mongoose.Schema({
  code: String,
  name: String,
  geometry: mongoose.Schema.Types.Geometry,
});

const Nation = mongoose.model("Nation", nationSchema);

export default Nation;
