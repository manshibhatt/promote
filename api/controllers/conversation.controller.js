import Conversation from '../models/conversation.model.js';

export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({ members: [senderId, receiverId] });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  export const getConvo =  async (req, res) => { 
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ message: "Both user IDs required." });
  }

  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) { 
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




