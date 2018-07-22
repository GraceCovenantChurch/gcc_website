import express from 'express';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import logger from 'morgan';
import publicAPI from '../server/api';
import api from './api';
import PageRouter from '../server/pageRouter';

const nconf = require('../config.js');

nconf.set('APP_ENV', 'server');

mongoose.Promise = Promise;

process.on('unhandledRejection', (err) => {
  console.log('Caught unhandledRejection');
  console.log(err);
});

const app = express();
app.use(compression());

if (nconf.get('NODE_ENV') !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const proxy = require('http-proxy-middleware'); // eslint-disable-line global-require
  app.use(proxy(`http://${nconf.get('ASSET_HOST')}/public/assets`));

  app.use(logger('dev'));
} else {
  app.use(logger('tiny'));
}

app.use('/static', express.static(path.join(__dirname, '../../static')));
app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));
app.use('/public', express.static(path.join(__dirname, '../public')));


if (!nconf.get('COOKIE_SECRET')) {
  throw new Error('No cookie secret provided. Please add one to config.json');
}

app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [nconf.get('COOKIE_SECRET')],
  maxAge: 60 * 60 * 1000, // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());
require('./auth')(app);

app.use('/api', api);
app.use('/api', publicAPI);

const routes = require('../admin_client/routes').default;
const reducers = require('../admin_client/modules').default;

app.use(PageRouter(routes, reducers, (head, content, state) => `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <link rel="stylesheet" type="text/css" href="/public/assets/adminApp.bundle.css" />
        <link rel="stylesheet" type="text/css" href="/public/assets/admin.bundle.css" />
      </head>
      <body ${head.bodyAttributes.toString()}>
        ${content}
        <script type="text/javascript">window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
        <script type="text/javascript" src="/public/assets/manifest.js"></script>
        <script type="text/javascript" src="/public/assets/react.js"></script>
        <script type="text/javascript" src="/public/assets/admin.js"></script>
        <script type="text/javascript" src="/public/assets/adminApp.js"></script>
      </body>
    </html>
  `));

mongoose.set('debug', nconf.get('NODE_ENV') !== 'production');

mongoose.connect(nconf.get('MONGODB_URI'), { useMongoClient: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');

  const port = nconf.get('ADMIN_SERVER_HOST').split(':')[1] || 80;
  app.listen(port, () => {
    console.log('Server listening on port', port);
  });
});
