//authenticate user
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

module.exports = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ErrorResponse("No token provided. Please signup or login", 401));
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new ErrorResponse("Invalid Token", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});
