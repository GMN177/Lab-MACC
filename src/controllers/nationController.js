const Nation = require("../models/nation");
const mongoose = require("mongoose");

async function getNation(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid ID");
  }

  return await Nation.findById(id);
}

async function search(search) {
  let queryParams = {};

  if (search.name) {
    Object.assign(queryParams, {
      name: {
        $regex: search.name,
        $options: "i",
      },
    });
  }

  if (search.lng && search.lat) {
    Object.assign(queryParams, {
      geometry: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(search.lng), parseFloat(search.lat)],
          },
        },
      },
    });
  }

  return await Nation.find(queryParams);
}

module.exports = {
  getNation,
  search,
};
