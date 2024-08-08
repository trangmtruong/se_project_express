// Routes tell the app which controller to use when a user makes a request
// like signposts that direct traffic

const { Router } = require("express");
const { getUsers, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const router = Router();

router.use(auth);
// route to get user data
router.get("/me", getUsers);

// route to modify user data
router.patch("/me", updateUser);

// const { createUser, getUsers, getUserId } = require("../controllers/users");
// // all routes in this file start with /users
// router.post("/", createUser);
// router.get("/", getUsers);
// router.get("/:userId", getUserId);

module.exports = router;
