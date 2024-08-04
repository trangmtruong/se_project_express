// Routes tell the app which controller to use when a user makes a request
// like signposts that direct traffic

const { Router } = require("express");

const router = Router();

const { createUser, getUsers, getUserId } = require("../controllers/users");
// all routes in this file start with /users

module.exports = router;
