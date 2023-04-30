const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = model("User", userSchema);
