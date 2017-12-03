const path = require('path');

module.exports = require('./webpack.common')('common', {
  app: path.resolve(__dirname, 'client/app.jsx'),
  'pages/Home': path.resolve(__dirname, 'client/pages/Home.jsx'),
  'pages/welcome/Welcome': path.resolve(__dirname, 'client/pages/welcome/Welcome.jsx'),
  'pages/Page': path.resolve(__dirname, 'client/pages/Page.jsx'),
  'pages/AsyncPage': path.resolve(__dirname, 'client/pages/AsyncPage.jsx'),
  'pages/familygroup/FamilyGroup': path.resolve(__dirname, 'client/pages/familygroup/FamilyGroup.jsx'),
});
