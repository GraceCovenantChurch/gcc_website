
var express = require('express');
var router = express.Router();

require('./auth')(router);

module.exports = router;