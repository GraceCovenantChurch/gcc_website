const path = require('path');
const nconf = require('nconf');

// secret config not needed for testing
const mockConfig = {
  GOOGLE_MAPS_KEY: 'GOOGLE_MAPS_KEY',
  COOKIE_SECRET: 'COOKIE_SECRET',
  MONGODB_URI: 'mongodb://localhost:27017/gccweb_test',
};

// secret config needed for testing
const secretConfig = {
  GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
  AWS_ACCESS_KEY_ID: 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY: 'AWS_SECRET_ACCESS_KEY',
};

const defaultConfig = {
  TRAVIS_PULL_REQUEST: false,
  NODE_ENV: 'development',
  ASSET_HOST: 'localhost:3000',
  PUBLIC_SERVER_HOST: 'localhost:8080',
  MONGODB_URI: 'mongodb://localhost:27017/gccweb',
  AWS_REGION: 'us-east-1',
  AWS_ASSET_BUCKET: 's3.web.staging',
};

nconf
  .argv()
  .env('__')
  .file({ file: path.join(__dirname, '../config.json') });

const defaultSecretConfig = nconf.get('TRAVIS_PULL_REQUEST') ? secretConfig : {};
const defaultMockConfig = nconf.get('TRAVIS_PULL_REQUEST') ? mockConfig : {};
nconf.defaults(Object.assign({}, defaultSecretConfig, defaultMockConfig, defaultConfig));

if (nconf.get('NODE_ENV') === 'test') {
  Object.keys(mockConfig).forEach((k) => {
    nconf.set(k, mockConfig[k]);
  });
}

nconf
  .required([
    ...Object.keys(secretConfig),
    ...Object.keys(mockConfig),
    ...Object.keys(defaultConfig),
  ]);

Object.keys(secretConfig).forEach((k) => {
  if (nconf.get(k) === secretConfig[k]) {
    console.warn(`Config variable ${k} is unset`); // eslint-disable-line no-console
  }
});

module.exports = nconf;
