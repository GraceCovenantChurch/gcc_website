import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import nconf from 'nconf';

const SERVER_ROOT = `http://${nconf.get('SERVER_HOST')}`;

if (nconf.get('NODE_ENV') === 'production') {
  passport.use(new GoogleStrategy({
    clientID: nconf.get('GOOGLE_CLIENT_ID'),
    clientSecret: nconf.get('GOOGLE_CLIENT_SECRET'),
    callbackURL: `${SERVER_ROOT}/login/callback`,
  }, ((accessToken, refreshToken, profile, cb) => {
      const emails = profile.emails.map(el => el.value);
      const approved = nconf.get('ADMIN_EMAILS').split(' ');
      for (let i = 0; i < emails.length; ++i) {
        if (approved.indexOf(emails[i]) >= 0) {
          return cb(null, profile);
        }
      }
      return cb(null, false);
    })));
}

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
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
    }
    return res.redirect('/login/success');
  });
}

module.exports = function auth(app) {
  app.get('/login', nconf.get('NODE_ENV') !== 'production' ? devAuth : googleAuth);

  app.get('/login/callback', passport.authenticate('google', {
    successRedirect: '/login/success',
    failureRedirect: '/',
  }));

  app.get('/login/success', (req, res) => {
    res.redirect(req.session.lastUrl || '/');
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.use('/', (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.lastUrl = req.originalUrl;
      return res.redirect('/login');
    }
    return next();
  });
};
