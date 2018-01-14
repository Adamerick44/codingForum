const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId:String,
  title:String,
  text:String
});

const userSchema = new mongoose.Schema({
  name:String,
  googleId:String,
  posts:[postSchema]
});

module.exports = mongoose.model('users',userSchema);
