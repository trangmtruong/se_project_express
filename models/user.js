const mongoose = require("mongoose");
//Schemas in models folder are like the blueprint for data
//Defines what data looks like and help interact w database
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validator: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
