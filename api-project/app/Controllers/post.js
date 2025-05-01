const { removeImage } = require('../../utils/Helper');
const Post = require('../Models/Post');

exports.list = async (req, res, next) => {
  try {
    const post = await Post.find();
    const response = { status: 'success', data: post };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);

    return res.status(505).json({
      status: 'failed',
      message: 'something went wrong.'
    });
  }
}

exports.store = async (req, res, next) => {
  try {
    const data = {
      userId: 1,
      title: req.body.title,
      imageName: req.file.originalname,
      fileName: req.file.filename,
      description: req.body.description,
    };

    const post = await Post.create(data);

    return res.status(201).json({
      status: 'success',
      message: 'successfully created.',
      data: post
    });
  } catch (error) {
    console.log(error);

    return res.status(505).json({
      status: 'failed',
      message: 'something went wrong.'
    });
  }
}

exports.details = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId });
    if (! post) {
      return res.status(404).json({
        status: 'failed',
        message: 'Not found.'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: post
    });

  } catch (error) {
    console.log(error);

    return res.status(404).json({
      status: 'failed',
      message: 'Not found.'
    });
  }
}

exports.update = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const image = req?.file;
    const data = {
      title: req.body.title,
      image: req.body.image,
      imageName: image?.originalname,
      fileName: image?.filename,
      description: req.body.description,
    };

    const post = await Post.findOne({ _id: postId });
    if (! post) {
      return res.status(404).json({
        status: 'failed',
        message: 'Not found.'
      });
    }

    if (image) {
      await removeImage(post.fileName);
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, data, { new: true });

    return res.status(200).json({
      status: 'success',
      message: 'successfully updated.',
      data: updatedPost
    });
  } catch (error) {
    console.log(error);
  }
}

exports.delete = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId });
    if (! post) {
      return res.status(404).json({
        status: 'failed',
        message: 'Not found.'
      });
    }

    await Post.deleteOne({ _id: postId });

    return res.status(200).json({
      status: 200,
      message: 'successfully deleted.'
    });
  } catch (error) {
    console.log(error);
  }
}