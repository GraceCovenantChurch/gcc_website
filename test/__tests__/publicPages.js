/* eslint-env node, jest */
/* global publicServer */

import request from 'supertest-as-promised';
import pretty from 'pretty';

describe('Public ServerTest', () => {
  it('renders Home page', () =>
    request(publicServer)
      .get('/')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders Welcome page', () =>
    request(publicServer)
      .get('/welcome')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders Family Group page', () =>
    request(publicServer)
      .get('/familygroup')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));

  it('renders 404 page', () =>
    request(publicServer)
      .get('/invalid')
      .expect(200)
      .then(res => expect(pretty(res.text)).toMatchSnapshot()));
});
