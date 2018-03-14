/* eslint-env node, jest */

import request from 'supertest-as-promised';
import Helmet from 'react-helmet';
import pretty from 'pretty';

let server;
let db;
const initServer = require('../build/server/app').default.then((obj) => {
  server = obj.server;
  db = obj.db;
});

describe('Client Pages', () => {
  beforeAll(() => {
    Helmet.canUseDOM = false;
    return initServer;
  });

  it('renders Home page', () =>
    request(server)
      .get('/')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders Welcome page', () =>
    request(server)
      .get('/welcome')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders Family Group page', () =>
    request(server)
      .get('/familygroup')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders 404 page', () =>
    request(server)
      .get('/invalid')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  afterAll(() => {
    Helmet.canUseDOM = true;
    server.close();
    db.close();
  });
});
