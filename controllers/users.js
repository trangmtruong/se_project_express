// //Controllers decide what happens when you get a request from a server
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { OK } = require("../utils/errors");
const { handleErrors } = require("../utils/errors");

const BadRequestError = require("../errors/bad-request-err");
const { logger } = require("../middlewares/logger");
// create user
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  const userInfo = { name, email };
  if (avatar) {
    userInfo.avatar = avatar;
  }

  if (!email || !password) {
    throw new BadRequestError("Invalid email and password");
  }

  logger.info("User sign up attempt", { meta: { email } });

  User.findOne({ email })

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
      logger.info("User created", { meta: { userId: user._id.toString() } });
      res.status(201).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })

    .catch((err) => {
      handleErrors(err, next);
    });
};
// getUsers
const getUsers = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      handleErrors(err, next);
    });
};

// login controller

const login = (req, res, next) => {
  const { email, password } = req.body;
  // get email and password from the request body
  if (!email || !password) {
    throw new BadRequestError("missing email or password");
  }
  return (
    User.findUserByCredentials(email, password)
      // if email and password are correct,
      .then((user) => {
        if (!user) {
          throw new BadRequestError("Could not find user's email");
        }

        // //creates JWT
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        // send token to client
        res.send({ token });
      })
      // if email and password are incorrect, return 401 error
      .catch((err) => {
        handleErrors(err, next);
      })
  );
};

const updateUser = (req, res, next) => {
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
    });
};

module.exports = {
  createUser,
  getUsers,
  login,
  updateUser,
};
