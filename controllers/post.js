const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { userId, caption, text } = req.body;

    let image = "";

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const post = await Post.create({
      user: userId,
      caption: caption || text,
      image,
    });

    res.status(201).json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "-password")
      .populate("comments.user", "-password")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked =
      post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const updatedPost =
      await Post.findById(postId)
        .populate("user", "-password")
        .populate(
          "comments.user",
          "-password"
        );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      user: userId,
      text,
    });

    await post.save();

    const updatedPost =
      await Post.findById(postId)
        .populate("user", "-password")
        .populate(
          "comments.user",
          "-password"
        );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};