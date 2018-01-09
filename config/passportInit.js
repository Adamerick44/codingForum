const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done) => {
  User.findById(id).then(user => {
    done(null,user);
  });
});

passport.use(new GoogleStrategy(keys.google,
  (accessToken,refreshToken,profile,done) => {
  //console.log(profile);
  User.findOne({googleId:profile.id}).then(user => {;

    if(user) {
      done(null,user);
    }

    else {
      const newUser = new User({
        googleId:profile.id,
        name:profile.displayName
      });

      newUser.save(err => {
        if(err) console.log(err);
        if(newUser.isNew) console.log('user not saved');
        done(null,newUser);
      });
    }
  });
}));
