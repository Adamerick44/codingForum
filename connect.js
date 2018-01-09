const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(
  keys.mongoUrl
  ,(err) => {
  if(err) console.log(err);
  else console.log('connected to mongodb');
});
