/* eslint-env node, jest */

import Helmet from 'react-helmet';

let db;

beforeAll(() => {
  Helmet.canUseDOM = false;
  // eslint-disable-next-line global-require
  return require('../src/server/app').default.then((obj) => {
    global.publicServer = obj.server;
    db = obj.db;
  });
});

afterAll(() => {
  Helmet.canUseDOM = true;
  global.publicServer.close();
  db.close();
});
