const express = require("express");
const { addImage, getImages } = require("../controllers/image");
const authUser = require("../middleware/auth")
const upload = require("../middleware/multer");
const router = express.Router();

router.post(
  "/upload",
  upload.single("photo_url"), authUser,
  addImage
);

router.get("/all", authUser, getImages)

module.exports = router;
