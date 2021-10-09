const multer = require("multer");
const ErrorResponse = require("../utils/errorResponse");
const fs = require('fs')

const imageFilter = (req, file, imageFilterCallback) => {
   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return imageFilterCallback(
        new ErrorResponse("Please upload either jpg, jpeg or png", 400)
      );
    }
    return imageFilterCallback(undefined, true);
};

const imageStorage = multer.diskStorage({
  destination: (req, file, imageStorageCallback) => {
    const path = `uploads/images/`
    fs.mkdirSync(path, { recursive: true })
    imageStorageCallback(null, path)
  },
  filename: (req, file, imageStorageCallback) => {
    imageStorageCallback(null, `${Date.now()}.${file.originalname}`)
  },
});

module.exports = multer({
  storage: imageStorage,
  limits: 8000000,
  fileFilter: imageFilter,
});
