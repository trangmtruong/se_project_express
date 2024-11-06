// Controllers decide what happens when you get a request from a server
// imports clothingItemSchema
const ClothingItem = require("../models/clothingItem");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  ACCESS_DENIED_ERROR,
  messageBadRequest,
  messageInternalServerError,
  messageNotFoundError,
  messageAccessDeniedError,
  handleErrors,
} = require("../utils/errors");

const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const ForbiddenError = require("../errors/forbidden-err");
const ConflictError = require("../errors/conflict-err");

const createItem = (req, res, next) => {
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
      handleErrors(err, next);
      // console.error(err);
      // if (err.name === "ValidationError") {
      //   //next(new BadRequestError('The id string is in an invalid format'))
      //   return res
      //     .status(BAD_REQUEST)
      //     .send({ message: `${messageBadRequest} from createItem` });
      // }
      // //else {
      // // next(err);
      // // }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: `${messageInternalServerError} from createItem` });
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      handleErrors(err, next);
    });
};

const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(OK).send({ data: item }))
    .catch((err) => {
      handleErrors(err, next);
      // if (error.name === "CastError") {
      //   next(new BadRequesrError("The id string is in an invalid format"))
      // } else {
      //   next(err);
      // }
      // console.error(err);
      // if (err.name === "ValidationError") {
      //   return res
      //     .status(BAD_REQUEST)
      //     .send({ message: `${messageBadRequest} from updateItem` });
      // }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: `${messageInternalServerError} from updateItem` });
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError("Current user does not own item");
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      handleErrors(err, next);
      // console.error(err);
      // if (err.name === "Access Denied") {
      //   //next( new ForbiddenError("You do not have permission"))
      //   return res
      //     .status(ACCESS_DENIED_ERROR)
      //     .send({ message: `${messageAccessDeniedError} to delete this item` });
      // }
      // if (err.name === "ValidationError" || err.name === "CastError") {
      //   //next( new BadRequestError("The id string is in an invalid format"))
      //   return res
      //     .status(BAD_REQUEST)
      //     .send({ message: `${messageBadRequest} from deleteItem` });
      // }
      // if (err.name === "DocumentNotFoundError") {
      //   //next( new NotFoundError("No user with matching ID found"))
      //   return res
      //     .status(NOT_FOUND)
      //     .send({ message: `${messageNotFoundError} from deleteItem` });
      // }

      // //else {
      // // next(err)}
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: `${messageInternalServerError} from deleteItem` });
    });
};

const likeItem = (req, res, next) => {
  return ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      handleErrors(err, next);
      // console.error(err);
      // if (err.name === "CastError") {
      //   return res
      //     .status(BAD_REQUEST)
      //     .send({ message: `${messageBadRequest} from likeItem` });
      // }
      // if (err.name === "DocumentNotFoundError") {
      //   return res
      //     .status(NOT_FOUND)
      //     .send({ message: `${messageNotFoundError} from likeItem` });
      // }
      // //else {
      // // next(err);
      // // }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: `${messageInternalServerError} from likeItem` });
    });
};
const dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      handleErrors(err, next);
      // console.error(err);
      // if (err.name === "CastError") {
      //   return res
      //     .status(BAD_REQUEST)
      //     .send({ message: `${messageBadRequest} from dislikeItem` });
      // }
      // if (err.name === "DocumentNotFoundError") {
      //   return res
      //     .status(NOT_FOUND)
      //     .send({ message: `${messageNotFoundError} from dislikeItem` });
      // }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: `${messageInternalServerError} from dislikeItem` });
    });

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
  ClothingItem,
};
