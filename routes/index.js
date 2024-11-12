// Routes tell the app which controller to use when a user makes a request
// like signposts that direct traffic
const router = require("express").Router();

const clothingRouter = require("./clothingItems");

const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");

const {
  validateURL,

  validateUserInfo,
  validateUserAuthentication,
} = require("../middlewares/validation");

const { NOT_FOUND, messageNotFoundError } = require("../utils/errors");

router.use("/items", clothingRouter);
router.use("/users", userRouter);
router.post("/signin", validateUserAuthentication, login);
router.post(
  "/signup",
  validateUserInfo,
  // validateURL,
  createUser
);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: messageNotFoundError });
});
module.exports = router;
