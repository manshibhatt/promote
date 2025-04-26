const MessageSchema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    messageType: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
    createdAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
  });
  