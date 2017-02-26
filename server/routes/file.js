var express = require('express');
var router = express.Router();
var File = require('../models/file.js')

router.get('/:name', function(req, res) {
  File.findOne({
    name: req.params.name
  }, function(err, file) {
    if (err) return next(err);
    res.contentType(file.contentType);
    res.send(file.data);
  });
});

module.exports = router;