import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectToDatabase, seedDatabase } from "./configs/database.js";
import authMiddleware from "./middlewares/auth.js";
import morganMiddleware from "./middlewares/morgan.middleware.js";
import nationRouter from "./services/nationService.js";
import plantRouter from "./services/plantService.js";
import userRouter from "./services/userService.js";
import log from "./utils/logger.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.use(morganMiddleware);

app.use(authMiddleware);

app.use("/api/nations", nationRouter);
app.use("/api/plants", plantRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  log.error(err.message);
  res.status(500).send("Something went wrong!");
});

connectToDatabase()
  .then(() => seedDatabase())
  .then(() => {
    let port = process.env.SERVER_PORT || 4000;
    app.listen(port, () => log.info(`SYSTEM UP AND RUNNING ON PORT ${port}!`));
  })
  .catch((err) => log.error(err.message));
