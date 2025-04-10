import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerckId: id });

    if (!user) {
      await User.create({
        clerckId: id,
        fullName: `${firstName} ${lastName}`,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
