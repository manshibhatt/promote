import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema( 
  { 
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: true,
    },
    lastMessage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
); 

export default mongoose.model('Conversation', ConversationSchema);

  