const OK = 200;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const DUPLICATE_ERROR = 11000;
const UNAUTHORIZED_ERROR_CODE = 401;

const messageBadRequest = "Bad Request Error";
const messageInternalServerError = "Internal Server Error";
const messageNotFoundError = "Not Found Error";
const messageDuplicateError = "Email Already Exists";
const messageUnauthorizedError = "Authorizatipn Required";

module.exports = {
  OK,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  DUPLICATE_ERROR,
  UNAUTHORIZED_ERROR_CODE,
  messageBadRequest,
  messageInternalServerError,
  messageNotFoundError,
  messageDuplicateError,
  messageUnauthorizedError,
};
