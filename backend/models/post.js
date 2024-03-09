const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  link: String,
  numUpvotes: Number,
  datePosted: Date,
  source: String, // Reddit or Twitter
  sentiment: Number,
  // can add more properties as needed
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
