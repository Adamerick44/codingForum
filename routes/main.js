const router = require('express').Router();
const passport = require('passport');

router.get('/',(req,res) => res.render('index'));
router.get('/home' ,(req,res) => res.render('index'));

router.get('/signin',(req,res) => {
  if(!req.user) res.render('signin');
  else res.redirect('/profile/')
});

router.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth/google',passport.authenticate('google',{
  scope:['profile']
}));

router.get('/auth/google/redirect',passport.authenticate('google'),(req,res) => {
  res.redirect('/profile/');
});

module.exports = router;
