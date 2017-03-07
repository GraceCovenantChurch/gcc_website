
var express = require('express');
var router = express.Router();

router.use('/mainAnnouncement', require('./mainAnnouncements'));
router.use('/smallAnnouncement', require('./smallAnnouncements'));
router.use('/memoryVerse', require('./memoryVerse'));
router.use('/staff', require('./staff'));
router.use('/file', require('./file'));

module.exports = router;