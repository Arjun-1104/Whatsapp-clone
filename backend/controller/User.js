import User from "../models/user.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
export const getUserDetails = async (req, res) => {
	try {
		const loggedInUser = req.user;
		res.status(200).json({loggedInUser});
	} catch (error) {
		console.error("Error in getUser: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};