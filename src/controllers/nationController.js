import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import Nation from "../models/nation.js";

async function getNation(id) {
  const nation = await Nation.findById(id);

  if (!nation) {
    throw new ApiError(httpStatus.NOT_FOUND, "Nation not found");
  }

  return nation;
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

export default { getNation, search };
