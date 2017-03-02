var express = require('express');
var mainAnnouncement = require('./routes/mainAnnouncements.js');
var smallAnnouncement = require('./routes/smallAnnouncements.js');
var memoryVerse = require('./routes/memoryVerse.js');
var staff = require('./routes/staff.js');
var believe = require('./routes/believe.js');
var app = express();
var db = require('./db.js');
var path = require('path');
var nconf = require('nconf');
nconf.argv().env().file({file: path.join(__dirname, 'config.json')});

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-session')({
  name: 'session',
  keys: [nconf.get('COOKIE_SECRET')],
  maxAge: 60 * 60 * 1000 // 1 hour
}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('client'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes'));
app.use('/staff', staff);
app.use('/believe', believe);

db.initialized.then(function() {
  app.listen(8000, function() {
    console.log("Listening on port 8000");
  });
});