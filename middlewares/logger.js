const winston = require("winston");
const expressWinston = require("express-winston");

// custom formatter
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) => {
      const metaError = meta && meta.error;
      const safeMessage =
        typeof message === "string" ? message : JSON.stringify(message);
      const output = metaError?.stack || safeMessage;
      return `${timestamp} ${level}: ${output}`;
    }
  )
);

// generic application logger for manual logging
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "app.log",
      format: winston.format.json(),
    }),
  ],
});

// request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
  logger,
};
