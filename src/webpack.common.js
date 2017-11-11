const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nconf = require('nconf');
require('./config.js');

nconf.set('APP_ENV', 'browser');

function addHMR(target) {
  return nconf.get('NODE_ENV') !== 'production' ? [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${nconf.get('CLIENT_HOST')}:${nconf.get('CLIENT_PORT')}`,
    'webpack/hot/only-dev-server',
    target,
  ] : target;
}

const styleLoaders = [
  nconf.get('NODE_ENV') !== 'production' ? 'style-loader' : undefined,
  {
    loader: 'css-loader',
    options: { importLoaders: 1, minimize: nconf.get('NODE_ENV') === 'production' },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: loader => [
        require('postcss-import')({ root: loader.resourcePath }),
        require('postcss-nested')(),
        require('postcss-cssnext')({
          browsers: ['last 2 versions', '> 5%'],
        }),
      ],
      sourceMap: nconf.get('NODE_ENV') !== 'production' ? 'inline' : undefined,
    },
  },
].filter(loader => loader);

module.exports = (commonName, targets) => ({
  devtool: nconf.get('NODE_ENV') !== 'production' ? 'cheap-module-eval-source-map' : undefined,
  entry: (function () {
    if (nconf.get('NODE_ENV') !== 'production') {
      const hmrTargets = {};
      Object.keys(targets).forEach((key) => {
        hmrTargets[key] = addHMR(targets[key]);
      });
      return hmrTargets;
    }
    return targets;
  }()),
  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
    publicPath: '/public/assets/',
  },
  resolve: {
    modules: [
      __dirname,
      '../node_modules',
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: nconf.get('NODE_ENV') !== 'production' ? styleLoaders : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: styleLoaders,
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { modules: false }],
              'react',
            ],
            plugins: [
              'transform-object-rest-spread',
              'dynamic-import-webpack',
            ],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', { modules: false }],
                'react',
              ],
              plugins: [
                'transform-object-rest-spread',
                'dynamic-import-webpack',
              ],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
        // loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    nconf.get('NODE_ENV') !== 'production' ? new webpack.HotModuleReplacementPlugin() : null,
    nconf.get('NODE_ENV') !== 'production' ? new webpack.NamedModulesPlugin() : null,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NCONF: JSON.stringify({
        CLIENT_HOST: nconf.get('CLIENT_HOST'),
        SERVER_HOST: nconf.get('SERVER_HOST'),
        CLIENT_PORT: nconf.get('CLIENT_PORT'),
        SERVER_PORT: nconf.get('SERVER_PORT'),
        NODE_ENV: nconf.get('NODE_ENV'),
        APP_ENV: nconf.get('APP_ENV'),
      }),
      CSS: 'true',
      'typeof window': '\"object\"', // for client-side mongoose build
    }),
    nconf.get('NODE_ENV') === 'production' ? new ExtractTextPlugin('[name].bundle.css', { allChunks: true }) : null,
    new webpack.NormalModuleReplacementPlugin(/nconf/, ((resource) => {
      resource.request = resource.request.replace(/nconf/, path.resolve(__dirname, 'nconf-browser'));
    })),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      minChunks(module, count) {
        const context = module.context;
        return context && (
          context.indexOf(path.join('node_modules', 'react')) >= 0 ||
          context.indexOf(path.join('node_modules', 'redux')) >= 0 ||
          context.indexOf(path.join('node_modules', 'fbjs')) >= 0 ||
          context.indexOf(path.join('node_modules', 'prop-types')) >= 0
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: commonName,
      chunks: Object.keys(targets),
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
  ].filter(plugin => plugin),

  devServer: {
    host: nconf.get('CLIENT_HOST'),
    port: nconf.get('CLIENT_PORT'),
    historyApiFallback: true, // respond to 404s with index.html
    hot: true, // enable HMR on the server
    inline: true,
    compress: true,
    overlay: {
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization',
    },
  },
});
