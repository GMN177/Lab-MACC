import "dotenv/config";
import express from "express";
import { connectToDatabase, seedDatabase } from "./configs/database.js";
import log from "./utils/logger.js";
import applyMiddlewares from "./middlewares/index.js";
import applyRoutes from "./routes/index.js";

const app = express();

applyMiddlewares(app);

applyRoutes(app);

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
