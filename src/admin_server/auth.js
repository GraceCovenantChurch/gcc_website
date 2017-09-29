import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import nconf from 'nconf';

const SERVER_ROOT = `http://${nconf.get('SERVER_HOST')}:${nconf.get('SERVER_PORT')}`;

if (nconf.get('NODE_ENV') === 'production') {
  passport.use(new GoogleStrategy({
    clientID: nconf.get('GOOGLE_CLIENT_ID'),
    clientSecret: nconf.get('GOOGLE_CLIENT_SECRET'),
    callbackURL: `${SERVER_ROOT}/login/callback`,
  }, function(accessToken, refreshToken, profile, cb) {
    var emails = profile.emails.map(el => {
      return el.value;
    });
    var approved = nconf.get('ADMIN_EMAILS').split(' ');
    for (var email of emails) {
      if (approved.indexOf(email) >= 0) {
        return cb(null, profile);
      }
    }
    return cb(null, false);
  }));
}

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const googleAuth = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
  ],
});

function devAuth(req, res, next) {
  req.login({
    name: 'developer',
  }, (err) => {
    if (err) {
      return next(err);
    } else {
      return res.redirect('/login/success');
    }
  });
}

module.exports = function(app) {
  app.get('/login', nconf.get('NODE_ENV') !== 'production' ? devAuth : googleAuth);

  app.get('/login/callback', passport.authenticate('google', {
    successRedirect: '/login/success',
    failureRedirect: '/',
  }));

  app.get('/login/success', function(req, res) {
    res.redirect(req.session.lastUrl || '/');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.use('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
      req.session.lastUrl = req.originalUrl;
      return res.redirect('/login');
    } else {
      return next();
    }
  });
}
