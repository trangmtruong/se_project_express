const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  UNAUTHORIZED_ERROR_CODE,
  messageUnauthorizedError,
} = require("../utils/errors");

const auth = (req, res, next) => {
  // getting authorization from the headers
  const { authorization } = req.headers;

  // checks if the header exists and starts with 'Bearer'
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: `${messageUnauthorizedError} from auth` });
  }

  // gets token
  const token = authorization.replace("Bearer ", "");
  let payload;
  // QUESTION: HOW TO KNOW WHEN TO USE TRY..CATCH.. VERSUS THEN... CATCH???
  try {
    // trying to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    // return error if something goes wrong
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: `${messageUnauthorizedError} from auth` });
  }

  // assining payload to request object
  req.user = payload;

  // sending request to the next middleware
  return next();
};

module.exports = auth;
