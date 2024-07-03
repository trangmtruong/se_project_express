//Controllers decide what happens when you get a request from a server
//imports clothingItemSchema
const ClothingItem = require("../models/clothingItem");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  messageBadRequest,
  messageInternalServerError,
  messageNotFoundError,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);

  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  const { _id } = req.user;

  ClothingItem.create({ name, weather, imageUrl, owner: _id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from createItem`, err });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `${messageInternalServerError} from createItem` });
      }
    });
};
("");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest}from getItems`, err });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `${messageInternalServerError} from getItems` });
      }
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from updateItem`, err });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `${messageInternalServerError} from updateItem` });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(NO_CONTENT).send({}))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} deleteItem`, err });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `${messageInternalServerError} from deleteItem` });
      }
    });
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
  ClothingItem,
};
