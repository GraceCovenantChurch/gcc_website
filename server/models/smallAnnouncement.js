var mongoose = require('mongoose')

var Schema = mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});


var Model = mongoose.model('SmallAnnouncement', Schema);

module.exports = Model;