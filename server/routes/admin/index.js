
var express = require('express');
var router = express.Router();
var createCRUD = require('./crud');

require('./auth')(router);

createCRUD(router, '/mainAnnouncement', { title: 'New Announcment' }, require('../../models/mainAnnouncement.js'), '/admin/#/mainAnnouncements');

createCRUD(router, '/smallAnnouncement', { text: 'New Announcment' }, require('../../models/smallAnnouncement'), '/admin/#/smallAnnouncements');

createCRUD(router, '/memoryVerse', { reference: 'Reference', verse: 'Verse' }, require('../../models/memoryVerse.js'), '/admin/#/memoryVerses');

module.exports = router;