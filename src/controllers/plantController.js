const Plant = require("../models/plant");
const mongoose = require("mongoose");

async function getPlant(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid ID");
  }

  return await Plant.findById(id);
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

  if (search.light) {
    Object.assign(queryParams, {
      "light.min": {
        $lte: search.light,
      },
      "light.max": {
        $gte: search.light,
      },
    });
  }

  if (search.humidity) {
    Object.assign(queryParams, {
      "humidity.min": {
        $lte: search.humidity,
      },
      "humidity.max": {
        $gte: search.humidity,
      },
    });
  }

  if (search.temperature) {
    Object.assign(queryParams, {
      "temperature.min": {
        $lte: search.temperature,
      },
      "temperature.max": {
        $gte: search.temperature,
      },
    });
  }

  return await Plant.find(queryParams);
}

module.exports = {
  getPlant,
  search,
};
