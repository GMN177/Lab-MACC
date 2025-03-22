import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import Plant from "../models/plant.js";

async function getPlant(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
  }

  const plant = await Plant.findById(id);

  if (!plant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Plant not found");
  }

  return plant;
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

  if (search.nations) {
    Object.assign(queryParams, {
      nations: {
        $in: search.nations,
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

export default { getPlant, search };
