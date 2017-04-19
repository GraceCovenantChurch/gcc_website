var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  data: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

Schema.virtual('url').get(function() {
  return '/file/' + this._id;
});

var Model = mongoose.model('File', Schema);

module.exports = Model;