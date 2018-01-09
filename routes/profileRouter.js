const router = require('express').Router();
const User = require('../models/userModel');
const bodyParser = require('body-parser');

const urlencoded = bodyParser.urlencoded({ extended: false })

const authCheck = (req,res,next) => {
  if(!req.user) res.redirect('/auth/google');
  else next();
}

router.get('/',authCheck,(req,res) => {
  res.render('profile',{user:req.user});
});

router.post('/newPost',urlencoded,(req,res) => {
  const user = req.user;

  const post = {
    text:req.body.newPost,
    userId:user.id
  }
  user.posts.push(post);
  user.save().then(user => {
    res.redirect('/profile/#');
  });
});

module.exports = router;
