import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
  ownerId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User'
     },
  name: String,
  description: String,
  category: String,
  phone: String,
  address: String,
  state: String,
  city: String,
  createdAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false } // optional for verification support
});

export default mongoose.model("Business", BusinessSchema);
  