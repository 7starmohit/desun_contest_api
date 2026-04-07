import User from '../models/user.js';

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

   
    if (req.user.id === id) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete their own account from here!"
      });
    }

    
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `User ${user.name} has been deleted successfully.`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while deleting user",
      error: error.message
    });
  }
};
