// //Controllers decide what happens when you get a request from a server
const User = require("../models/user");
const {
  OK,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  messageBadRequest,
  messageInternalServerError,
  messageNotFoundError,
} = require("../utils/errors");

//create user
const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error(err);
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} createUser`, err });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `${messageInternalServerError} from createUser` });
      }
    });
};

//getUsers
const getUsers = (req, res) => {
  User.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from getUsers`, err });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `${messageInternalServerError} from getUsers` });
      }
    });
};
//getUserId

const getUserId = (req, res) => {
  const { userId } = req.params;

  User.find({ _id: userId })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest}from getUserId` });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `${messageInternalServerError} from getUserId` });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
};
