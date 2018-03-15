/* eslint-env node, jest */

import request from 'supertest-as-promised';
import pretty from 'pretty';

import { withPublicServer } from '../serverSetup';

describe('Public ServerTest', () => {
  let server = withPublicServer();

  it('renders Home page', () =>
    request(server())
      .get('/')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders Welcome page', () =>
    request(server())
      .get('/welcome')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders Family Group page', () =>
    request(server())
      .get('/familygroup')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders 404 page', () =>
    request(server())
      .get('/invalid')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));
});
