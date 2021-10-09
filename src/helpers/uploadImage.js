const { cloudinary } = require("../../config/cloudinary");

exports.cloudinaryImageUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { folder: "images" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};
