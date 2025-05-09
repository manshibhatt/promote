import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  // { _id: false } 
);

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: [String],
      default: [],
      required: true,
    },
    location:{
      type:String,
      default:""
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: { createdAt: 'createdAt' , updatedAt: 'updatedAt' },
  }
);

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});


postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

export default mongoose.model('Post', postSchema);
