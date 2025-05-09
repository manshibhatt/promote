import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    conversationId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Conversation',
      required:true
    },
    senderId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
    },
    text:{
      type:String,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      default: null,
    },
  },
  {timestamps: true}
)

export default mongoose.model('Message', MessageSchema); 