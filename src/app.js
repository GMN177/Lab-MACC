import cors from "cors";
import express from "express";
import authMiddleware from "./middlewares/auth.js";
import { errorHandler, successHandler } from "./configs/morgan.js";
import errorHandlerMiddleWare from "./middlewares/error.js";
import applyRoutes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(successHandler);
app.use(errorHandler);

app.use(cors());

app.use(authMiddleware);

applyRoutes(app);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandlerMiddleWare);

export default app;
