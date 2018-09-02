const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nconf = require('./src/config.js');
nconf.set('APP_ENV', 'browser');

const ASSET_HOST = nconf.get('ASSET_HOST');
const [assetHost, assetPort] = ASSET_HOST ? ASSET_HOST.split(':') : [];

function getStyleLoaders(options) {
  return [
    nconf.get('NODE_ENV') !== 'production' ? 'style-loader' : undefined,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        localIdentName: options.local ? '[name]__[local]___[hash:base64:5]' : '[name]',
        modules: options.local,
        minimize: nconf.get('NODE_ENV') === 'production',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: loader => [
          require('postcss-import')({ root: loader.resourcePath }),
          require('postcss-nested')(),
          require('postcss-extend')(),
          require('postcss-css-variables'),
          require('postcss-calc'),
          require('postcss-cssnext')({
            browsers: ['last 2 versions', '> 5%'],
          }),
        ],
        sourceMap: nconf.get('NODE_ENV') !== 'production' ? 'inline' : undefined,
      },
    },
  ].filter(loader => loader);
}

const styleLoaders = getStyleLoaders({local: true});
const externalStyleLoaders = getStyleLoaders({local: false});

const publicEntry = {
  app: 'client/app.jsx',
  'pages/Home': 'client/pages/Home.jsx',
  'pages/Welcome': 'client/pages/Welcome.jsx',
  'pages/Page': 'client/pages/Page.jsx',
  'pages/AsyncPage': 'client/pages/AsyncPage.jsx',
  'pages/FamilyGroup': 'client/pages/FamilyGroup.jsx',
  'pages/Ministries': 'client/pages/Ministries.jsx',
};

const adminEntry = {
  adminApp: 'admin_client/app.jsx',
  adminModelPage: 'admin_client/pages/ModelPage.jsx',
};

const extractCSS = new ExtractTextPlugin({
  filename: '[name].bundle.css',
  allChunks: true,
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: nconf.get('NODE_ENV') !== 'production' ? 'cheap-module-eval-source-map' : undefined,
  entry: Object.assign({}, publicEntry, adminEntry),
  output: {
    path: path.resolve(__dirname, 'build/public/assets'),
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
    publicPath: '/public/assets/',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: nconf.get('NODE_ENV') !== 'production' ? styleLoaders : extractCSS.extract({
          fallback: 'style-loader',
          use: styleLoaders,
        }),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: nconf.get('NODE_ENV') !== 'production' ? externalStyleLoaders : extractCSS.extract({
          fallback: 'style-loader',
          use: externalStyleLoaders,
        }),
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',    // where the fonts will go
          }
        }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          // 'eslint-loader',
        ],
      },
    ],
  },
  plugins: [
    nconf.get('NODE_ENV') !== 'production' ? new webpack.HotModuleReplacementPlugin() : null,
    nconf.get('NODE_ENV') !== 'production' ? new webpack.NamedModulesPlugin() : null,
    new webpack.NoEmitOnErrorsPlugin(),
    nconf.get('NODE_ENV') !== 'production' ? new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }) : null,
    new webpack.DefinePlugin({
      NCONF: JSON.stringify({
        PUBLIC_SERVER_HOST: nconf.get('PUBLIC_SERVER_HOST'),
        ADMIN_SERVER_HOST: nconf.get('ADMIN_SERVER_HOST'),
        NODE_ENV: nconf.get('NODE_ENV'),
        APP_ENV: nconf.get('APP_ENV'),
        GOOGLE_MAPS_KEY: nconf.get('GOOGLE_MAPS_KEY'),
      }),
      'typeof window': '\"object\"', // for client-side mongoose build
    }),
    new webpack.NormalModuleReplacementPlugin(/nconf/, ((resource) => {
      resource.request = resource.request.replace(/nconf/, path.resolve(__dirname, 'src/nconf-browser'));
    })),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      minChunks(module, count) {
        const context = module.context;
        return context && (
          context.endsWith(path.join('node_modules', 'react')) ||
          context.endsWith(path.join('node_modules', 'react-dom')) ||
          context.endsWith(path.join('node_modules', 'react-helmet')) ||
          context.endsWith(path.join('node_modules', 'react-redux')) ||
          context.endsWith(path.join('node_modules', 'react-router')) ||
          context.indexOf(path.join('node_modules', 'redux')) >= 0 ||
          context.indexOf(path.join('node_modules', 'fbjs')) >= 0 ||
          context.indexOf(path.join('node_modules', 'prop-types')) >= 0
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'public',
      chunks: Object.keys(publicEntry),
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'admin',
      chunks: Object.keys(adminEntry),
      minChunks: 2,
    }),
    new HtmlWebpackPlugin({
      favicon: 'src/images/favicon.ico'
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    nconf.get('NODE_ENV') === 'production' ? extractCSS : null,
  ].filter(plugin => plugin),
  devServer: {
    host: assetHost,
    port: assetPort,
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
  },
};
