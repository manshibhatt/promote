
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "https://promote-s12l.onrender.com",
    // origin: "https://fronend-t.onrender.com",
    // origin: "http://localhost:5173",
  },
});

let onlineUser = [];
const PORT = process.env.PORT || 4000;

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};


const getUser = (userId) => {
  return onlineUser.find(user => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    // console.log('Current online users:', onlineUser);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    // console.log(receiverId)
    const receiver = getUser(receiverId); 
   // console.log(receiver) 
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});


io.listen(PORT);
