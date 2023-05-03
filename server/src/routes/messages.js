const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/send-message/", addMessage);
router.get("/all-messages/", getMessages);

module.exports = router;
