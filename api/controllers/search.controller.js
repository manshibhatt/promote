import User from "../models/user.model.js";
import Business from "../models/business.model.js";
import Post from "../models/post.model.js"

export const searchUser = async(req, res)=>{
    const q= req.query.search;
    const users= await User.find({
        username: { $regex: q, $options: "i"},
    }).select("username profilePic _id");
    res.status(200).json(users);
}



export const searchPost= async (req, res) => {  
    const { q, location, tag } = req.query;
    console.log('q:', q);
    console.log('location:', location);
    console.log('tag:', tag);
    if (!q && !location && !tag) return res.json([]);
  
    const fullQueryRegex = new RegExp(q, "i");
  
    // First: match full phrase in username or business name
    const users = await User.find({ username: { $regex: fullQueryRegex } }).select("_id");
    const businesses = await Business.find({ name: { $regex: fullQueryRegex } }).select("ownerId");
  
    const userIds = [
      ...new Set([
        ...users.map(u => u._id.toString()),
        ...businesses.map(b => b.ownerId.toString()),
      ]),
    ];
  
    const postQuery = {
      $or: [
        { userId: { $in: userIds } },
        { tags: { $regex: fullQueryRegex } },
      ],
    };
  
    
    if (location) {
      postQuery.location = { $regex: new RegExp(location, "i") };
    }
  
    
    if (tag) {
      postQuery.tags = { $regex: new RegExp(tag, "i") };
    }
  
    const posts = await Post.find(postQuery).populate("userId", "username profilePic");
    res.status(200).json(posts);
  }
  