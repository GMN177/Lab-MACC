import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import log from "../configs/logger.js";

const convertError = (err) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  return error;
};

const errorHandlerMiddleWare = (err, req, res, next) => {
  let { statusCode, message } = convertError(err);

  if (process.env.NODE_ENV !== "dev" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === "dev" && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === "dev") {
    log.error(err.message);
  }

  res.status(statusCode).send(response);
};

export default errorHandlerMiddleWare;
