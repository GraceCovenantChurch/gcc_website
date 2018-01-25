const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const nconf = require(path.resolve(__dirname, '../src/config.js'));
nconf.set('NODE_ENV', 'dev');


spawn('babel-watch', ['./src/server/app.js'], {
  shell: true,
  stdio: 'inherit',
  env: Object.assign({}, process.env, {
    BABEL_ENV: 'server',
  }),
});

spawn('babel-watch', ['./src/admin_server/app.js'], {
  shell: true,
  stdio: 'inherit',
  env: Object.assign({}, process.env, {
    BABEL_ENV: 'server',
  }),
});

const webpackConfig = require('../webpack.config.js');
Object.keys(webpackConfig.entry).forEach(key => {
  const entry = webpackConfig.entry[key];
  if (Array.isArray(entry)) {
    entry.unshift(
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${nconf.get('ASSET_HOST')}`,
      'webpack/hot/only-dev-server'
    );
  } else {
    webpackConfig.entry[key] = [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${nconf.get('ASSET_HOST')}`,
      'webpack/hot/only-dev-server',
      entry,
    ];
  }
});

const webpackServer = new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer);
webpackServer.listen(webpackConfig.devServer.port);
