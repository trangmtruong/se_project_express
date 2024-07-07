// Routes tell the app which controller to use when a user makes a request
// like signposts that direct traffic
const router = require("express").Router();
const clothingRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND, messageNotFoundError } = require("../utils/errors");
router.use("/items", clothingRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: messageNotFoundError });
});
module.exports = router;
