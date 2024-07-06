// Routes tell the app which controller to use when a user makes a request
// like signposts that direct traffic
const router = require("express").Router();
const clothingRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/items", clothingRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});
module.exports = router;
