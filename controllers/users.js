// //Controllers decide what happens when you get a request from a server
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
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

const NotFoundError = require("../errors/not-found-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const ForbiddenError = require("../errors/forbidden-err");
const ConflictError = require("../errors/conflict-err");
const BadRequestError = require("../errors/bad-request-err");
// create user
const createUser = (req, res, next) => {
  console.log(req);
  console.log(req.body);

  let { name, avatar, email, password } = req.body;
  const userInfo = { name, email };
  if (avatar) {
    userInfo.avatar = avatar;
  }

  // hash password
  // bcrypt.hash(req.body.password, 10)

  // throw a 110{{00 error for duplicate error using throw block

  if (!email || !password) {
    throw new BadRequestError("Invalid email and password");
    // res
    //   .status(BAD_REQUEST)
    //   .send({ message: `${messageBadRequest} from createUser` });
    // return;
  }

  User.findOne({ email })
    .select("+password")
    .then((existingEmail) => {
      if (existingEmail) {
        const error = new Error();
        error.name = "DuplicateError";
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      userInfo.password = hash;
      return User.create(userInfo);
    })
    .then((user) => {
      console.log(user);
      res.status(201).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })

    .catch((err) => {
      // if (err.name === "ValidationError") {
      //   console.error(err);
      //   return res
      //     .status(BAD_REQUEST)
      //     .send({ message: `${messageBadRequest} createUser` });
      // }
      // if (err.name === "DuplicateError" || err.code === 11000) {
      //   return res
      //     .status(DUPLICATE_ERROR)
      //     .send({ message: `${messageDuplicateError} from createUser` });
      // }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: `${messageInternalServerError} from createUser` });
      handleErrors(err, next);
    });
};
// getUsers
const getUsers = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      handleErrors(err, next);
      // console.error(err);
      // if (err.name === "ValidationError") {
      //   return res
      //     .status(BAD_REQUEST)
      //     .send({ message: `${messageBadRequest} from getUsers` });
      // }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: `${messageInternalServerError} from getUsers` });
    });
};
// getUserId

// const getUserId = (req, res) => {
//   const { userId } = req.params;

//   User.findById(userId)
//     .orFail()
//     .then((item) => res.status(OK).send(item))
//     .catch((err) => {
//       console.error(err);
//       if (err.name === "CastError") {
//         return res
//           .status(BAD_REQUEST)
//           .send({ message: `${messageBadRequest}from getUserId ` });
//       }
//       if (err.name === "DocumentNotFoundError") {
//         return res
//           .status(NOT_FOUND)
//           .send({ message: `${messageNotFoundError} from getUserId` });
//       }
//       return res
//         .status(INTERNAL_SERVER_ERROR)
//         .send({ message: `${messageInternalServerError} from getUserId` });
//     });
// };
// login controller

const login = (req, res) => {
  const { email, password } = req.body;
  // get email and password from the request body
  if (!email || !password) {
    // return res
    //   .status(BAD_REQUEST)
    //   .send({ message: `${messageBadRequest} from login` });
    throw new BadRequestError("missing email or password");
  }
  return (
    User.findOne({ email })
      // if email and password are correct,
      .then((user) => {
        // res.status(OK).send(user);
        // //creates JWT
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        // send token to client
        res.send({ token, user });
      })
      // if email and password are incorrect, return 401 error
      .catch((err) => {
        handleErrors(err, next);
        // console.error(err);
        // res
        //   .status(UNAUTHORIZED_ERROR_CODE)
        //   .send({ message: `${messageUnauthorizedError}` });
      })
  );
};

const updateUser = (req, res) => {
  // findByIdandUpdate
  // req.user._id
  // return Not Found
  // return Validation
  // return default server error
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
    // pass the options object:
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
    }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleErrors(err, next);
      // if (err.name === "ValidationError") {
      //   console.error(err);
      //   return res
      //     .status(BAD_REQUEST)
      //     .send({ message: `${messageBadRequest} updateUser` });
      // }
      // if (err.name === "DocumentNotFoundError") {
      //   return res
      //     .status(NOT_FOUND)
      //     .send({ message: `${messageNotFoundError} from updateUser` });
      // }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: `${messageInternalServerError} from updateUser` });
    });
};

module.exports = {
  createUser,
  getUsers,
  login,
  updateUser,
};
