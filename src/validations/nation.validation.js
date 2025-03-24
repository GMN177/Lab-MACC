import Joi from "joi";
import { objectId } from "./custom.validation.js";

const searchNation = {
  query: Joi.object({
    name: Joi.string(),
    lng: Joi.number(),
    lat: Joi.number(),
  })
    .and("lng", "lat")
    .unknown(false),
};

const getNation = {
  params: Joi.object({
    nationId: Joi.string().custom(objectId),
  }).unknown(false),
};

export default { searchNation, getNation };
