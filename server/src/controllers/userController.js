require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const BaseError = require("../ExceptionHandler/baseError");
const Api404Error = require("../ExceptionHandler/api404Error");
const httpStatusCodes = require("../ExceptionHandler/httpStatusCodes");

exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const checkEmail = await User.findOne({ email });
    const checkUserName = await User.findOne({ userName });
    if (checkEmail)
      return res.status(201).json({
        success: false,
        message: `User with ${email} is already registered`,
      });

    if (checkUserName) {
      return res.status(201).json({
        success: false,
        message: `Username ${userName} is already used`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "New user registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user)
      return res.status(200).json({
        success: false,
        message: `User name ${userName} does not exist`,
      });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again",
      });

    // delete user.password;

    return res.status(200).json({
      success: true,
      data: user,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "email",
      "userName",
      "avatarImage",
    ]);

    return res.status(200).json({
      success: true,
      message: "All the users of chat-mates",
      data: allUsers,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (ex) {
    next(ex);
  }
};
