import User from "../models/user.model.js";

// Controller to get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to update user's profile or cover image
export const updateUserImage = async (req, res) => { 
  const { userId, imageUrl, isCoverImage } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update either profilePic or coverImage based on isCoverImage flag
    if (isCoverImage) {
      user.coverImage = imageUrl;
    } else {
      user.profilePic = imageUrl;
    }

    // Save the updated user
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'Image updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update image' });
  }
};
