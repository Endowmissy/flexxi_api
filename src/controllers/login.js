const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const sendUserResponse = require('../utils/sendUserResponse');

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
   
    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 401))
    };
    
    const comparePassword = await user.validatePassword(password);
   
    if (!comparePassword) {
        return next(new ErrorResponse('Invalid Credentials', 401))
    };

    sendUserResponse(user, 'User logged in successfully', 200, res);
})
