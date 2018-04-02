/* eslint-env node, jest */
import nconf from '../src/config';

export const itPrivate = nconf.get('TRAVIS_PULL_REQUEST') ? it.skip : it;
export const describePrivate = nconf.get('TRAVIS_PULL_REQUEST') ? describe.skip : describe;
