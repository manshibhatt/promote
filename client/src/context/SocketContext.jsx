import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; 
import {AuthContext} from "./AuthContext.jsx"


export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    // const socketIo = io("http://localhost:4000");
    const socketIo = io("https://trutur.onrender.com");

    // Set socket to state
    setSocket(socketIo);

    // Cleanup on unmount
    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      // console.log("Emitting newUser event for ID:", currentUser.id);
      socket.emit("newUser", currentUser._id); 
    }
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
