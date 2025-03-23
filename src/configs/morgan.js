import morgan from "morgan";
import log from "./logger.js";

morgan.token("message", (req, res) => res.locals.errorMessage || "");

const getIpFormat = () =>
  process.env.NODE_ENV !== "dev" ? ":remote-addr - " : "";

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => log.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => log.error(message.trim()) },
});

export { successHandler, errorHandler };
