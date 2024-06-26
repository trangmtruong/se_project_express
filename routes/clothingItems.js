//Routes tell the app which controller to use when a user makes a request
//like signposts that direct traffic

const router = require("express").Router();

const { createItem } = require("../controllers/clothingItems");

//CRUD
//Create
router.post("/", createItem);

//Read

//Update

//Delete

module.exports = router;
