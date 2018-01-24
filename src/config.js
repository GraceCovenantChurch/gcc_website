const path = require('path');
const nconf = require('nconf');

nconf.argv().env('__').file({ file: path.join(__dirname, '../config.json') }).defaults({
  NODE_ENV: 'dev',
  ASSET_HOST: "localhost:3000",
  PUBLIC_SERVER_HOST: "localhost:8080",
  ADMIN_SERVER_HOST: "localhost:8081",
  MONGODB_URI: 'mongodb://localhost:27017/gccweb',
});

module.exports = nconf;
