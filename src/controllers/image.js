const User = require("../models/user");
const Image = require("../models/image");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const SuccessResponse = require("../utils/successResponse");
const { cloudinaryImageUpload } = require("../helpers/uploadImage");
const unlinkAsync = require("../helpers/removeFile");

// @desc    Add new image
// @route   POST /api/v1/image/upload
// @access  Public

exports.addImage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { keywords } = req.body;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  if (!req.file) {
    throw new ErrorResponse("Please upload image", 400);
  }

  //upload image to cloudinary
  const uploadedImage = await cloudinaryImageUpload(req.file.path);
  const toCreate = {
    user_id: user.id,
    photo_url: uploadedImage.url,
    keywords,
  };

  // add image to database
  const image = await Image.create(toCreate);

  // delete file from local disk
  await unlinkAsync(req.file.path);

  SuccessResponse(res, 201, "Image added successfully", image);
});

exports.getImages = asyncHandler(async(req, res) => {
    const allImages = await Image.find({}).sort({ createdAt: "descending"})

    SuccessResponse(res, 201, "Image fetched successfully", allImages);

})
