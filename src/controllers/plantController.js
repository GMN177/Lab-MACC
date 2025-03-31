import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import Plant from "../models/plant.js";

async function getPlant(id) {
  const plant = await Plant.findById(id);

  if (!plant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Plant not found");
  }

  return plant;
}

async function search(search, nations) {
  let queryParams = {};

  if (search.name) {
    Object.assign(queryParams, {
      name: {
        $regex: search.name,
        $options: "i",
      },
    });
  }

  if (nations) {
    Object.assign(queryParams, {
      nations: {
        $in: nations,
      },
    });
  }

  if (search.brightness && search.brightness > 0.0) {
    Object.assign(queryParams, {
      "brightness.min": {
        $lte: search.brightness,
      },
      "brightness.max": {
        $gte: search.brightness,
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

export default { getPlant, search };
