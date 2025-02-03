const socketIO = require("socket.io");
const UserModel = require("../models/users");

let io = null;

function initSocket(server) {
  io = socketIO(server, {
    cors: true,
  });

  io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    const user = UserModel.findByToken(token);

    if (user) {
      console.log(
        "Client connect success with token: ",
        token,
        " username: ",
        user.name
      );

      user.socketId = socket.id;
      user.disconnect = false;
      user.update();
    } else {
      console.log("Client connect failed with token: ", token);
      socket.emit("info", { msg: "token无效" });
      socket.disconnect(true);
    }

    socket.on("info", ({ msg }) => {
      console.log("Received message:", msg);
    });

    socket.on("message", ({ receiver, content }) => {
      if (receiver === user.id) return;

      const sender = user.id;
      const receiverSocketId = UserModel.findById(receiver).socketId;

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message", {
          sender: sender,
          receiver: receiver,
          content: content,
        });
      }
      socket.emit("message", {
        sender: sender,
        receiver: receiver,
        content: content,
      });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnect.");
      user.socketId = null;
      user.disconnect = true;
      io.emit("userLeave", {
        userInfo: {
          id: user.id,
          name: user.name,
        },
      });
    });
  });
}

function sendNewuser(userInfo) {
  if (!io) return;

  io.emit("newuser", { userInfo });
}

module.exports = {
  initSocket,
  sendNewuser,
};
