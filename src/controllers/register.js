const User = require('../models/user');
const asyncHandler = require('../middleware/asyncHandler');
const sendUserResponse = require('../utils/sendUserResponse')

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res ) => {
  const { full_name, email, password } = req.body;

  // Create user
  const user = await User.create({
    full_name,
    email,
    password,
  });

  sendUserResponse(user, "User signed up successfully", 201, res);
});
