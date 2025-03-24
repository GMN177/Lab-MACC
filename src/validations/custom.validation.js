import mongoose from "mongoose";

const objectId = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

export { objectId };
