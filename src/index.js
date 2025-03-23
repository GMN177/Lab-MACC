import "dotenv/config";
import app from "./app.js";
import { seedDatabase } from "./configs/database.js";
import log from "./configs/logger.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

let server;
mongoose
  .connect(process.env.DB_URI)
  .then(seedDatabase)
  .then(() => {
    log.info("Connected to MongoDB");
    let port = process.env.SERVER_PORT || 4000;
    server = app.listen(port, () => {
      log.info(`Listening to port ${port}`);
    });
  });

const unexpectedErrorHandler = (error) => {
  log.error(error);
  if (server) {
    server.close(() => {
      log.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  log.info("SIGTERM received");
  if (server) server.close();
});
