//Routes tell the app which controller to use when a user makes a request
//like signposts that direct traffic

const { Router } = require("express");

const router = Router();
//all routes in this file start with /users
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userId", getUserId);

module.exports = router;
