const { removeImage } = require('../../utils/Helper');
const Post = require('../Models/Post');

exports.list = async (req, res, next) => {
  try {
    const post = await Post.find();

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    return res.status(505).json({
      success: false,
      message: 'something went wrong.'
    });
  }
}

exports.store = async (req, res, next) => {
  try {
    const data = {
      userId: req.userId,
      title: req.body.title,
      imageName: req.file.originalname,
      fileName: req.file.filename,
      description: req.body.description,
    };

    const post = await Post.create(data);

    return res.status(201).json({
      success: true,
      message: 'successfully created.',
      data: post
    });
  } catch (error) {
    return res.status(505).json({
      success: false,
      message: 'something went wrong.'
    });
  }
}

exports.details = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId, userId: userId });
    if (! post) {
      return res.status(404).json({
        success: false,
        message: 'Not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: post
    });

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Not found.'
    });
  }
}

exports.update = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;
    const image = req?.file;
    const data = {
      title: req.body.title,
      image: req.body.image,
      imageName: image?.originalname,
      fileName: image?.filename,
      description: req.body.description,
    };

    const post = await Post.findOne({ _id: postId, userId: userId });
    if (! post) {
      return res.status(404).json({
        success: false,
        message: 'Not found.'
      });
    }

    if (image) {
      await removeImage(post.fileName);
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, data, { new: true });

    return res.status(200).json({
      success: true,
      message: 'successfully updated.',
      data: updatedPost
    });
  } catch (error) {
    console.log(error);
  }
}

exports.delete = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId, userId: userId });
    if (! post) {
      return res.status(404).json({
        success: false,
        message: 'Not found.'
      });
    }

    await Post.deleteOne({ _id: postId });

    return res.status(200).json({
      success: true,
      message: 'successfully deleted.'
    });
  } catch (error) {
    console.log(error);
  }
}