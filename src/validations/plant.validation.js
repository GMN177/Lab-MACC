import Joi from "joi";
import { objectId } from "./custom.validation.js";

const searchPlant = {
  query: Joi.object({
    name: Joi.string(),
    lng: Joi.number(),
    lat: Joi.number(),
    brightness: Joi.number(),
    humidity: Joi.number(),
    temperature: Joi.number(),
  })
    .and("lng", "lat")
    .unknown(false),
};

const getPlant = {
  params: Joi.object({
    plantId: Joi.string().custom(objectId),
  }).unknown(false),
};

export default { searchPlant, getPlant };
