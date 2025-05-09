import { useContext, useEffect, useState, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import newRequest from "../utils/newRequest";
import { useParams } from "react-router-dom";

const MessagesPage = () => {
  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AuthContext);
  const { userId: receiverId } = useParams();
  const loggedInUserId = currentUser?._id;
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverInfo, setReceiverInfo] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (!loggedInUserId || !receiverId) return;

    const fetchConversation = async () => {
      try {
        const res = await newRequest.post("/conversations/access", {
          senderId: loggedInUserId,
          receiverId,
        });

        setConversationId(res.data._id);

        const messageRes = await newRequest.get(`/messages?conversationId=${res.data._id}`);
        setMessages(messageRes.data);
      } catch (err) {
        console.error("Error fetching conversation or messages:", err);
      }
    };

    const fetchReceiver = async () => {
      try {
        const res = await newRequest.get(`/users/${receiverId}`);
        setReceiverInfo(res.data);
      } catch (err) {
        console.error("Error fetching receiver:", err);
      }
    };

    fetchConversation();
    fetchReceiver();
  }, [loggedInUserId, receiverId]);

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("getMessage", handleIncomingMessage);

    return () => {
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [socket]);

  const handleSend = async () => {
    if (!newMessage.trim() || !conversationId) return;

    const messageData = {
      conversationId,
      senderId: loggedInUserId,
      text: newMessage,
    };

    try {
      const res = await newRequest.post("/messages/", messageData);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");

      if (socket) {
        socket.emit("sendMessage", {
          receiverId,
          data: res.data,
        });
      }
    } catch (err) {
      console.error("Sending message failed", err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-[#f8f9fa] border border-gray-300 shadow-md rounded-lg">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-[#004d38] text-white rounded-t-lg">
        {receiverInfo?.profilePic && (
          <img
            src={receiverInfo.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        )}
        <h2 className="text-lg font-semibold">
          {receiverInfo?.username || "Chat"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-[#e3efe8] no-scrollbar">
        {messages.map((msg) => {
          const senderId =
            typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId;
          const isMe = senderId === loggedInUserId;

          return (
            <div
              key={msg._id}
              ref={scrollRef}
              className={`flex ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  isMe
                    ? "bg-[#006b4a] text-white"
                    : "bg-[#c8dfd2] text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-4 border-t bg-white rounded-b-lg">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
