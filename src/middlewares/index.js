import cors from "cors";
import { json } from "express";
import authMiddleware from "./auth.js";
import errorHandlerMiddleWare from "./error.js";
import morganMiddleware from "./morgan.js";

const applyMiddlewares = (app) => {
  app.use(
    cors({
      origin: "*",
    }),
  );

  app.use(json());

  app.use(morganMiddleware);

  app.use(authMiddleware);
};

const applyErrorMiddlewares = (app) => {
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  });

  app.use(errorHandlerMiddleWare);
};

export { applyErrorMiddlewares, applyMiddlewares };
