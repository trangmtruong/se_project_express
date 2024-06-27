//Routes tell the app which controller to use when a user makes a request
//like signposts that direct traffic

const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
} = require("../controllers/clothingItems");

//CRUD
//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//Update

router.put("/:itemId", updateItem);

//Delete

module.exports = router;
