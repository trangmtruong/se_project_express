// //Controllers decide what happens when you get a request from a server
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT } = require("../utils/config");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  DUPLICATE_ERROR,
  UNAUTHORIZED_ERROR_CODE,
  messageBadRequest,
  messageInternalServerError,
  messageNotFoundError,
  messageDuplicateError,
  messageUnauthorizedError,
} = require("../utils/errors");

// create user
const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar, email, password } = req.body;
  //hash password
  // bcrypt.hash(req.body.password, 10)

  //throw a 110{{00 error for duplicate error using throw block

  if (!email || !password) {
    res
      .status(BAD_REQUEST)
      .send({ message: `${messageBadRequest} from createUser` });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw { name: "DuplicateError" };
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return User.create({ name, avatar, email, password: hash })

        .then((user) => {
          console.log(user);
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            console.error(err);
            return res
              .status(BAD_REQUEST)
              .send({ message: `${messageBadRequest} createUser` });
          }
          if (err.name === "DuplicateError" || err.code === 11000) {
            return res
              .status(DUPLICATE_ERROR)
              .send({ message: `${messageDuplicateError} from createUser` });
          }
          return res
            .status(INTERNAL_SERVER_ERROR)
            .send({ message: `${messageInternalServerError} from createUser` });
        });
    });
};

// getUsers
const getUsers = (req, res) => {
  User.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from getUsers` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from getUsers` });
    });
};
// getUserId

const getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest}from getUserId ` });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: `${messageNotFoundError} from getUserId` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from getUserId` });
    });
};
//login controller

const login = (req, res) => {
  const { email, password } = req.body;
  //get email and password from the request body
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: `${messageBadRequest} from login` });
  }
  return (
    User.findUserByCredentials(email, password)
      //if email and password are correct,
      .then((user) => {
        // res.status(OK).send(user);
        // //creates JWT
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        //send token to client
        res.send({ token });
      })
      //if email and password are incorrect, return 401 error
      .catch((err) => {
        console.err(err);
        res
          .status(UNAUTHORIZED_ERROR_CODE)
          .send({ message: `${messageUnauthorizedError}` });
      })
  );
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  login,
};
