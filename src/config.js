const path = require('path');
const nconf = require('nconf');

// secret config not needed for testing
const mockConfig = {
  GOOGLE_MAPS_KEY: 'GOOGLE_MAPS_KEY',
  COOKIE_SECRET: 'COOKIE_SECRET',
};

// secret config needed for testing
const secretConfig = {
  GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
};

const defaultConfig = {
  TRAVIS_PULL_REQUEST: false,
  NODE_ENV: 'development',
  ASSET_HOST: 'localhost:3000',
  PUBLIC_SERVER_HOST: 'localhost:8080',
  ADMIN_SERVER_HOST: 'localhost:8081',
  MONGODB_URI: 'mongodb://localhost:27017/gccweb',
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
    console.warn(`Config variable ${k} is unset`);
  }
});

module.exports = nconf;
