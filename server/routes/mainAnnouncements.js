var express = require('express');
var router = express.Router();
var MainAnnouncement = require('../models/mainAnnouncement.js');

router.get('/', function(req, res) {
  MainAnnouncement.find({})
  .populate('pic', 'url')
  .exec(function(err, announcements) {
    res.send(announcements);
  });
});

module.exports = router;
