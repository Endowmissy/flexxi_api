const express = require("express");
const { addImage } = require("../controllers/image");
const authUser = require("../middleware/auth")
const upload = require("../middleware/multer");
const router = express.Router();


router.post(
  "/upload",
  upload.single("photo_url"), authUser,
  addImage
);

module.exports = router;
