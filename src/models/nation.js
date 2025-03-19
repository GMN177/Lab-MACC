const GeoJSON = require("mongoose-geojson-schema");
const mongoose = require("mongoose");

const nationSchema = new mongoose.Schema({
  code: String,
  name: String,
  geometry: mongoose.Schema.Types.Geometry,
});

nationExport = mongoose.model("nation", nationSchema);

module.exports = nationExport;
