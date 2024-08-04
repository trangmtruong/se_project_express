const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
module.exports = (req, res, next) => {
  //getting authorization from the headers
  const { authorization } = req.headers;

  // checks if the header exists and starts with 'Bearer'
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  //gets token
  const token = authorization.replace("Bearer ", "");
  let payload;
  //QUESTION: HOW TO KNOW WHEN TO USE TRY..CATCH.. VERSUS THEN... CATCH???
  try {
    //trying to verify the token
    const payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    //return error if something goes wrong
    return res.status(401).send({ message: "Authorization Required" });
  }

  //assining payload to request object
  req.user = payload;
  //sending request to the next middleware
  next();
};
