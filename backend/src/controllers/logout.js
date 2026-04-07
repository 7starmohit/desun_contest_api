export const logoutUser = async (req, res) => {
  try {
    
    const cookieOptions = {
      httpOnly: true,
      secure: true, 
      sameSite: "none"
    };

    
    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions) 
      .json({
        success: true,
        message: "User logged out successfully!"
      });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error during logout",
      error: error.message
    });
  }
};
