const { logger } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { meta: { error: err } });
  const { statusCode = 500, message = "An error occurred on the server" } = err;
  return res.status(statusCode).send({
    message,
  });
};

module.exports = errorHandler;
