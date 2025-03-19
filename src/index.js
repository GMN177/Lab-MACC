require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const authMiddleware = require("./middlewares/auth");
const morganMiddleware = require("./middlewares/morgan.middleware");
const nationRouter = require("./services/nationService");
const plantRouter = require("./services/plantService");
const userRouter = require("./services/userService");
const db = require("./configs/database");

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
  logger.error(err.message);
  res.status(500).send("Something went wrong!");
});

db.connectToDatabase()
  .then(() => db.seedDatabase())
  .then(() => {
    let port = process.env.SERVER_PORT || 4000;
    app.listen(port, () =>
      logger.info(`SYSTEM UP AND RUNNING ON PORT ${port}!`),
    );
  })
  .catch((err) => logger.error(err.message));
