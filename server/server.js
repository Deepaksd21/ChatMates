require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const logger = require("./src/loggers/logger");
const userRoutes = require("./src/routes/user");
const messageRoutes = require("./src/routes/messages");
const httpLogger = require("./src/loggers/httpLogger");
const {
  logError,
  returnError,
  isOperationalError,
} = require("./src/ExceptionHandler/errorHandler");
const socket = require("socket.io");
const app = express();
const server = require("http").createServer(app);

process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error) => {
  logError(error);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

app.use(cors());
// app.use(logError);
// app.use(httpLogger);
app.use(returnError);
app.use(express.json());
app.use(morgan("short"));
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);

require("../server/src/db/db");

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
