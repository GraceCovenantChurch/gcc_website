var express = require('express');
var mainAnnouncement = require('./routes/mainAnnouncements.js');
var smallAnnouncement = require('./routes/smallAnnouncements.js');
var memoryVerse = require('./routes/memoryVerse.js');
var staff = require('./routes/staff.js');
var app = express();
var db = require('./db.js');

app.use(express.static('client'));
app.use('/mainAnnouncement', mainAnnouncement);
app.use('/smallAnnouncement', smallAnnouncement);
app.use('/memoryVerse', memoryVerse);
app.use('/staff', staff);
app.use('/file', require('./routes/file.js'));

db.initialized.then(function() {
  app.listen(8000, function() {
    console.log("Listening on port 8000");
  });
});