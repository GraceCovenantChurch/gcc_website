var mongoose = require('mongoose')

var Schema = mongoose.Schema({
  verse: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  pic: {
    type: String
  }
}, {
  toJSON: { virtuals: true }
});

Schema.virtual('pic_url').get(function() {
  return '/file/' + this.pic.toString();
});

var Model = mongoose.model('MemoryVerse', Schema);

module.exports = Model;