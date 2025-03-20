import morgan from "morgan";
import log from "../utils/logger.js";

const stream = {
  write: (message) => log.http(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || "dev";
  return env !== "dev";
};

morgan.token("request-body", (req, res) => JSON.stringify(req.body));

const morganMiddleware = morgan(
  ":method :url :status - :response-time ms - :request-body",
  {
    stream,
    skip,
  },
);

export default morganMiddleware;
