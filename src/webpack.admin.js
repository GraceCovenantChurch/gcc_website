const path = require('path');

module.exports = require('./webpack.common')('adminCommon', {
  adminApp: path.resolve(__dirname, 'admin_client/app.jsx'),
  'adminAnnouncements': path.resolve(__dirname, 'admin_client/pages/Announcements.jsx'),
});
