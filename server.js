const express = require('express');
const keys = require('./config/keys');
const connect = require('./connect');
const passportInit = require('./config/passportInit');
const mainRoutes = require('./routes/main.js');
const profile = require('./routes/profileRouter');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.use(cookieSession({
  maxAge:24 * 60 * 60 * 1000 * 30,
  keys:keys.session.cookieKeys
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');

app.use('/assets',express.static('public'));

app.use('/',mainRoutes);
app.use('/profile',profile);

const port = 3000 || process.env.port;
const host = 'localhost' || process.env.ip;

const server = app.listen(port,host);
