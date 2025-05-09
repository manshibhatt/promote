import Message from '../models/message.model.js';

export const createMessage = async (req, res) => {
  const { conversationId, senderId, text, postId } = req.body;

  try {
    const newMessage = new Message({
      conversationId,
      senderId,
      text,
      postId: postId || null,
    });

    const saved = await newMessage.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.query;  // Get conversationId from query params

    const messages = await Message.find({ conversationId })
      .populate('senderId', 'username profilePic')
      .populate('postId', 'image');

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
