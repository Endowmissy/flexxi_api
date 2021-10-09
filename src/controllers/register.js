const User = require('../models/user');
const asyncHandler = require('../middleware/asyncHandler');
const sendUserResponse = require('../utils/sendUserResponse')
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res ) => {
  const { full_name, email, password } = req.body;

  // check if the email coming from the body exist
  const email_exist = await User.findOne({ email })
  if(email_exist) {
    return new ErrorResponse('This email has been used', 400)
  }

  // Create user
  const user = await User.create({
    full_name,
    email,
    password,
  });

  sendUserResponse(user, "User signed up successfully", 201, res);
});
