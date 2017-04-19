var express = require('express');
var router = express.Router();
var File = require('../models/file.js')

router.get('/:id', function(req, res) {
  File.findOne({
    _id: req.params.id
  }, function(err, file) {
    if (err) return next(err);
    if (file) {
      res.contentType(file.contentType);
      res.send(file.data);
    } else {
      res.end();
    }
  });
});

module.exports = router;