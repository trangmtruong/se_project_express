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

// CRUD

// Read
router.get("/", getItems);

router.use(auth);
// Create
router.post("/", createItem);

// Update

router.put("/:itemId", updateItem);

// Delete

router.delete("/:itemId", deleteItem);

// Like Item (Put)
router.put("/:itemId/likes", likeItem);

// Dislike Item(Delete)
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
