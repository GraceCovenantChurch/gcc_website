var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String
  }
});

var Model = mongoose.model('File', Schema);

module.exports = Model;