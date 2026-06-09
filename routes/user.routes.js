const express = require("express");

const router = express.Router();

const {
  updateProfile,
  getUser,
} = require("../controllers/user");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage,
});

router.get("/:id", getUser);

router.put(
  "/:id",
  upload.single("profilePic"),
  updateProfile
);

module.exports = router;