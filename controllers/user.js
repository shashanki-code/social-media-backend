const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;

    let profilePic = "";

    if (req.file) {
      profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser =
      await User.findByIdAndUpdate(
        id,
        {
          name,
          bio,
          ...(profilePic && {
            profilePic,
          }),
        },
        {
          new: true,
        }
      ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user =
      await User.findById(
        req.params.id
      ).select("-password");

    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};