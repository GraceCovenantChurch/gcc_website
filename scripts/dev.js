const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const nconf = require(path.resolve(__dirname, '../src/config.js'));
nconf.set('NODE_ENV', 'dev');

const execBabel = ['--exec', 'babel-node', ...[
    '--presets=env,react',
    '--plugins=dynamic-import-node,transform-object-rest-spread'
  ]
];

spawn('nodemon', [
  path.resolve(__dirname, '../src/server/app.js'),
  ...execBabel,
  ...['--watch', path.resolve(__dirname, '../src/server')],
  ...['--watch', path.resolve(__dirname, '../src/models')]
], {
  shell: true,
  stdio: 'inherit',
});

spawn('nodemon', [
  path.resolve(__dirname, '../src/admin_server/app.js'),
  ...execBabel,
  ...['--watch', path.resolve(__dirname, '../src/admin_server')],
  ...['--watch', path.resolve(__dirname, '../src/models')]
], {
  shell: true,
  stdio: 'inherit',
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
