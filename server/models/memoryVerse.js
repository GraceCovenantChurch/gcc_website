var mongoose = require('mongoose');
var File = require('./file');

var Schema = mongoose.Schema({
  verse: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  pic: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  _pic: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: undefined },
});

Schema.pre('remove', function(next) {
  File.findByIdAndRemove(this.pic).exec();
  next();
});

Schema.pre('save', function(next) {
  if (this.isModified('pic')) {
    if (this._pic) {
      File.findByIdAndRemove(this._pic).exec();
    }
    this._pic = this.pic;
  }
  next();
});

var Model = mongoose.model('MemoryVerse', Schema);

module.exports = Model;