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
    title:req.body.title,
    userId:user.id
  }
  user.posts.push(post);
  user.save().then(user => {
    res.redirect('/profile/#');
  });
});

router.post('/deletePost',urlencoded,(req,res) => {
  const user = req.user;

  user.posts.splice(user.posts.indexOf(req.body.post),1);
  user.save().then(() => {
    res.redirect('/profile/');
  });
});

module.exports = router;
