
var mongoose = require('mongoose');

var db = {
  initialized: new Promise(function(resolve, reject) {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gccweb', function(err) {
      if (err) reject(err);
      console.log('Connected to database')
      resolve();
    });
  })
};

module.exports = db;

var async = require('async');
var MainAnnouncement = require('./models/mainAnnouncement.js');
var SmallAnnouncement = require('./models/smallAnnouncement.js');
var MemoryVerse = require('./models/memoryVerse.js');
var File = require('./models/file.js');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// INITIAL SEED DATA FOR DEV
// drops collections and repoluates with seed data
if (process.env.NODE_ENV === 'dev') {
  db.initialized.then(function() {

    fs.readdir(path.join(__dirname, 'seed/files'), function(err, filenames) {
      File.remove({}, function(err) {
        async.parallel(filenames.map(function(filename) {
          return function(cb) {
            var filepath = path.join(__dirname, 'seed/files', filename);
            fs.readFile(filepath, function(err, data) {
              File.create({
                name: filename,
                data: data,
                contentType: mime.lookup(filepath)
              }, cb);
            });
          }  
        }), function(err, results) {
          if (err) throw err;
        });
      });
    });

    fs.readFile(path.join(__dirname, 'seed/mainAnnouncements.json'), 'utf8', function(err, data) {
      var announcements = JSON.parse(data);
      MainAnnouncement.remove({}, function(err) {
        async.parallel(announcements.map(function(announcement) {
          return function(cb) {
            MainAnnouncement.create(announcement, cb);
          }
        }), function(err, results) {
          if (err) throw err;
        })
      });
    });

    fs.readFile(path.join(__dirname, 'seed/smallAnnouncements.json'), 'utf8', function(err, data) {
      var announcements = JSON.parse(data);
      SmallAnnouncement.remove({}, function(err) {
        async.parallel(announcements.map(function(text) {
          return function(cb) {
            SmallAnnouncement.create({
              text: text
            }, cb)
          }
        }), function(err, results) {
          if (err) throw err;
        })
      });
    });

    fs.readFile(path.join(__dirname, 'seed/memoryVerses.json'), 'utf8', function(err, data) {
      var verses = JSON.parse(data);
      MemoryVerse.remove({}, function(err) {
        async.parallel(verses.map(function(verse) {
          return function(cb) {
            MemoryVerse.create(verse, cb);
          }
        }), function(err, results) {
          if (err) throw err;
        })
      });
    });
  });
}