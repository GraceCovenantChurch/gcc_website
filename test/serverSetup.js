/* eslint-env node, jest */

import Helmet from 'react-helmet';

export function withPublicServer() {
  let result = {};

  beforeAll(() => {
    Helmet.canUseDOM = false;
    // eslint-disable-next-line global-require
    return require('../src/server/app').default.then((obj) => {
      Object.assign(result, obj);
    });
  });

  afterAll(() => {
    Helmet.canUseDOM = true;
    result.server.close();
    result.db.close();
  });

  return function() {
    return result.server;
  }
}
