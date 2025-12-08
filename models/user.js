const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { logger } = require("../middlewares/logger");
// Schemas in models folder are like the blueprint for data
// Defines what data looks like and help interact w database
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  logger.info("User login attempt", { meta: { email } });
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        logger.warn("User not found for login", { meta: { email } });
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          logger.warn("Password mismatch for login", { meta: { email } });
          return Promise.reject(new Error("Incorrect email or password"));
        }
        logger.info("User login success", { meta: { userId: user._id.toString() } });
        return user;
      });
    });
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
