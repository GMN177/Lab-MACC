import cors from "cors";
import authMiddleware from "./auth.js";
import morganMiddleware from "./morgan.js";
import { json } from "express";

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

export default applyMiddlewares;
