var mongoose = require('mongoose')

var Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
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

var Model = mongoose.model('MainAnnouncement', Schema);

module.exports = Model;