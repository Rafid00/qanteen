const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: String,
  biography: String,
  password: String, // Hashed password should be stored here
  dateOfOpening: Date,
  totalUpvote: Number,
  totalDownvote: Number,
  yourPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  likedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  savedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  image: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  follows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;