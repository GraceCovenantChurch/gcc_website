
var nconf = require('nconf');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var nconf = require('nconf');

passport.use(new GoogleStrategy({
  clientID: nconf.get('GOOGLE_CLIENT_ID'),
  clientSecret: nconf.get('GOOGLE_CLIENT_SECRET'),
  callbackURL: nconf.get('SERVER_ROOT') + '/admin/login/callback'
}, function(accessToken, refreshToken, profile, cb) {
  var emails = profile.emails.map(el => {
    return el.value
  });

  // if any one of emails is in whitelisted list
  var found = false;
  var authorized = nconf.get('ADMIN_EMAILS');
  for (var i = 0; i < emails.length; ++i) {
    for (var j = 0; j < authorized.length; ++j) {
      if (emails[i] === authorized[j]) {
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    return cb(null, profile);
  }

  return cb(null, false);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = function(router) {
  router.get('/login', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email']
  }));

  router.get('/login/callback', passport.authenticate('google', {
    successRedirect: '/admin/login/success',
    failureRedirect: '/'
  }));

  router.get('/login/success', function(req, res) {
    res.redirect(req.session.lastUrl || '/')
  });

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  });

  router.use('/', function (req, res, next) {
    if (!req.isAuthenticated()) {
      req.session.lastUrl = req.originalUrl;
      return res.redirect('/admin/login')
    } else {
      return next()
    }
  });
}
