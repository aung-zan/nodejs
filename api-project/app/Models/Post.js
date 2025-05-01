const { Schema, model } = require('mongoose');

const PostSchema = Schema({
  // userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  userId: { type: Number },
  title: { type: String, required: true },
  imageName: { type: String, required: true },
  fileName: { type: String, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true
});

const Post = model('posts', PostSchema);

module.exports = Post;