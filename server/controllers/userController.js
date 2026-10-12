import User from "../models/userModel.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};