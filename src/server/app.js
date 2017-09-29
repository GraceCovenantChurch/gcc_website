import nconf from 'nconf';
require('../config.js');
nconf.set('APP_ENV', 'server');

import express from 'express';
import path from 'path';
import http from 'http';
import compression from 'compression';
import api from './api';
import PageRouter from './pageRouter';

process.on('unhandledRejection', err => {
  console.log("Caught unhandledRejection");
  console.log(err);
});

const app = express();
app.use(compression());

if (nconf.get('NODE_ENV') !== 'production') {
  const proxy = require('http-proxy-middleware');
  app.use(proxy(`http://${nconf.get('CLIENT_HOST')}:${nconf.get('CLIENT_PORT')}/public/assets/*`));

  app.use(require('morgan')('dev'));
} else {
  app.use(require('morgan')('tiny'));
}

app.use('/static', express.static(path.join(__dirname, '../../static')));
app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api', api);

const routes = require('../client/routes').default;
const reducers = require('../client/modules').default;
app.use(PageRouter(routes, reducers, (head, content, state) => {
  return `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/public/assets/app.bundle.css" />
      </head>
      <body ${head.bodyAttributes.toString()}>
        ${content}
        <script type="text/javascript">window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
        <script type="text/javascript" src="/public/assets/manifest.js"></script>
        <script type="text/javascript" src="/public/assets/react.js"></script>
        <script type="text/javascript" src="/public/assets/common.js"></script>
        <script type="text/javascript" src="/public/assets/app.js"></script>
      </body>
    </html>
  `;
}));

app.listen(nconf.get('SERVER_PORT'), function() {
  console.log('Server listening on port', nconf.get('SERVER_PORT'));
});
