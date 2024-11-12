// Routes tell the app which controller to use when a user makes a request
// like signposts that direct traffic

const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

// CRUD

// Read
router.get("/", getItems);

router.use(auth);

// Create
router.post("/", validateClothingItem, createItem);

// Delete

router.delete("/:itemId", validateId, deleteItem);

// Like Item (Put)
router.put("/:itemId/likes", validateId, likeItem);

// Dislike Item(Delete)
router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
