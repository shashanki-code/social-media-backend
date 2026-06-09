const express = require("express");

const router = express.Router();

const {
  createPost,
  getPosts,
  likePost,
  commentPost,
} = require("../controllers/post");

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

router.post(
  "/create",
  upload.single("image"),
  createPost
);

router.get("/", getPosts);

router.put(
  "/like/:postId",
  likePost
);

router.post(
  "/comment/:postId",
  commentPost
);

module.exports = router;