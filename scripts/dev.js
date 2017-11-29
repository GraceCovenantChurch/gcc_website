const nconf = require('nconf');
const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

nconf.set('NODE_ENV', 'dev');

function makeWebpackServer(webpackConfig, port) {
  Object.keys(webpackConfig.entry).forEach(key => {
    const entry = webpackConfig.entry[key];
    if (Array.isArray(entry)) {
      entry.unshift(
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server'
      );
    } else {
      webpackConfig.entry[key] = [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server',
        entry,
      ];
    }
  });
  const webpackServer = new WebpackDevServer(webpack(webpackConfig), {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    hot: true,
    compress: true,
    overlay: {
      errors: true,
    },
    stats: {
      colors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization',
    },
    publicPath: '/public/assets/',
  });
  webpackServer.listen(port);
}

spawn('nodemon', [
  path.resolve(__dirname, '../src/server/app.js'),
  ...['--exec', 'babel-node', ...[
        '--presets=env,react',
        '--plugins=dynamic-import-node,transform-object-rest-spread'
      ]
  ],
  ...['--watch', path.resolve(__dirname, '../src/server')]
], {
  shell: true,
  stdio: 'inherit',
  env: {
    SERVER_HOST: 'localhost:8080',
    CLIENT_HOST: 'localhost:3000',
  }
});

spawn('nodemon', [
  path.resolve(__dirname, '../src/admin_server/app.js'),
  ...['--exec', 'babel-node', ...[
        '--presets=env,react',
        '--plugins=dynamic-import-node,transform-object-rest-spread'
      ]
  ],
  ...['--watch', path.resolve(__dirname, '../src/admin_server')]
], {
  shell: true,
  stdio: 'inherit',
  env: {
    SERVER_HOST: 'localhost:8081',
    CLIENT_HOST: 'localhost:3001',
  }
});

nconf.set('CLIENT_HOST', 'localhost:3000');
nconf.set('SERVER_HOST', 'localhost:8080');
makeWebpackServer(require(path.resolve(__dirname, '../src/webpack.config.js')), 3000);

nconf.set('CLIENT_HOST', 'localhost:3001');
nconf.set('SERVER_HOST', 'localhost:8081');
makeWebpackServer(require(path.resolve(__dirname, '../src/webpack.admin.js')), 3001);
