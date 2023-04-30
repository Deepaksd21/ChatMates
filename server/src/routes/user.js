const router = require("express").Router();

const {
  registerUser,
  getAllUsers,
  loginUser,
  setAvatar,
  logOut,
} = require("../controllers/userController");

router.get("/users/:id", getAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/setAvatar/:id", setAvatar);

router.get("/logout/:id", logOut);

module.exports = router;
